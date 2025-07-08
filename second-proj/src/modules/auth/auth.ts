import {
    CanActivate,
    ExecutionContext,
    Injectable,
    UnauthorizedException,
} from '@nestjs/common';

import { Request } from 'express';
import { AuthService } from './auth.service';

@Injectable()
export class KartikAuth implements CanActivate {
    constructor(private authSer: AuthService) { }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest<Request>();
        const authHeader = request.headers['authorization'];

        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            throw new UnauthorizedException('Missing token');
        }

        const token = authHeader.replace('Bearer ', '');
        try {
            const payload = await this.authSer.verifyToken(token);
            console.log('Token payload:', payload);
            request['user'] = payload; // Attach payload to request
            return true;
        } catch {
            throw new UnauthorizedException('Invalid token');
        }
    }
}