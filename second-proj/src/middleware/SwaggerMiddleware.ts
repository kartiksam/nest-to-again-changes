

import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as basicAuth from 'basic-auth';

@Injectable()
export class SwaggerAuthMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const user = basicAuth(req);

    const username = process.env.SWAGGER_USER || 'admin';
    const password = process.env.SWAGGER_PASSWORD || 'secret';

    // Disable browser cache
    res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
    res.setHeader('Pragma', 'no-cache');
    res.setHeader('Expires', '0');
    res.setHeader('Surrogate-Control', 'no-store');

    if (!user || user.name !== username || user.pass !== password) {
      res.set('WWW-Authenticate', 'Basic');
      return res.status(401).send('Authentication required.');
    }

    next();
  }

}
