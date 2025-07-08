import { Module } from '@nestjs/common';
import { LoginLogmoduleController } from './login-logmodule.controller';
import { LoginLogService } from './login-logmodule.service';
import { MongooseModule } from '@nestjs/mongoose';
import { LoginLog, LoginLogSchema } from './login.schema';

@Module({
    imports: [MongooseModule.forFeature([{ name: LoginLog.name, schema: LoginLogSchema }]),],
    providers: [LoginLogService],
    exports: [LoginLogService],
    controllers: [LoginLogmoduleController]

})
export class LoginModule { }
