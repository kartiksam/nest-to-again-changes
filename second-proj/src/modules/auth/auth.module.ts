import { forwardRef, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';


import { JwtModule, JwtService } from '@nestjs/jwt';
import { UserModule } from '../users/user-modules';
import { KartikAuth } from './auth';
import { LoginModule } from '../login-logmodule/login-logmodule.module';


@Module({
  imports: [

    forwardRef(() => UserModule), LoginModule

  ],
  providers: [AuthService, KartikAuth],
  controllers: [AuthController],
  exports: [KartikAuth, AuthService]
})
export class AuthModule { }
