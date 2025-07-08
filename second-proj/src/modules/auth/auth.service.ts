import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as jwt from "jsonwebtoken";
import { UserService } from '../users/services/user.service';
import { LoginDto } from './dto/loginDto';
import { RegisterDto } from './dto/registerDto';
import * as bcrypt from 'bcrypt';
import { LoginLogService } from '../login-logmodule/login-logmodule.service';
import { Request } from 'express';
import { StatusEnum } from '../login-logmodule/enums/StatusEnum';


@Injectable()
export class AuthService {
    constructor(private userService: UserService, private readonly loginLogService: LoginLogService,) { }

    private SECRET_KEY = "jhkjhfdkjhjhgjgfjgjgfjgdjhbfdghfhgjkhdfghdkjfghsdghdjkfghjkdfhjkghkjgf";

    async validateUser(dto: LoginDto, req: Request): Promise<any> {
        const { email, password } = dto;


        const ip =
            (req.headers['x-forwarded-for'] as string)?.split(',')[0]?.trim() ||
            req.socket?.remoteAddress ||
            'null';
        const user_agent = req.headers['user-agent'] || 'null';


        const user = await this.userService.findByEmail(email);
        console.log("user is" + user);


        if (!user) {
            console.log('Logging failed login due to user not found');
            await this.loginLogService.logLogin({
                user_id: 'null',
                ip,
                user_agent,
                status: StatusEnum.FAILED,
            });
            console.log('Log saved');

            throw new UnauthorizedException('User not found');
        }


        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            await this.loginLogService.logLogin({
                user_id: user._id.toString(),
                ip,
                user_agent,
                status: StatusEnum.FAILED,
            });

            throw new UnauthorizedException('Invalid credentials');
        }


        await this.loginLogService.logLogin({
            user_id: user._id.toString(),
            ip,
            user_agent,
            status: StatusEnum.SUCCESS,
        });


        const { password: _, ...userWithoutPassword } = user.toObject?.() || user;
        return userWithoutPassword;
    }



    generateToken(user: any): string {
        const plainUser = user.toObject?.() || user._doc || user;
        console.log(plainUser);
        const payload = { id: plainUser._id, email: plainUser.email, role: plainUser.role };
        console.log('Token payload:', payload); // Optional

        return jwt.sign(payload, this.SECRET_KEY);
    }

    async verifyToken(token: string) {
        try {
            return jwt.verify(token, this.SECRET_KEY)
        }
        catch (err) {
            throw new UnauthorizedException('Invalid Token')
        }
    }

    async register(dto: RegisterDto) {
        return this.userService.create(dto);
    }

}
