import { forwardRef, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from '../users/user-modules';
import { KartikAuth } from './auth';
import { LoginModule } from '../login-logmodule/login-logmodule.module';
import { OtpsModule } from '../otps/otps.module';


@Module({
  imports: [

    forwardRef(() => UserModule), LoginModule, OtpsModule

  ],
  providers: [AuthService, KartikAuth],
  controllers: [AuthController],
  exports: [KartikAuth, AuthService]
})
export class AuthModule { }
