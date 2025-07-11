import { forwardRef, Module } from '@nestjs/common';
import { OtpsController } from './otps.controller';
import { OtpsService } from './otps.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Otp, OtpSchema } from './otp.schema';
import { UserModule } from '../users/user-modules';
import { EmailModule } from '../email/email.module';

@Module({
  imports: [MongooseModule.forFeature([{ name: Otp.name, schema: OtpSchema }]), forwardRef(() => UserModule), EmailModule],
  controllers: [OtpsController],
  providers: [OtpsService],
  exports: [OtpsService]
})
export class OtpsModule { }
