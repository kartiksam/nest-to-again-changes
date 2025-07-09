import { Body, Controller, Post } from '@nestjs/common';
import { OtpsService } from './otps.service';
import { GenerateOtpDto, VerifyOtpDto } from './dto/otp.dto';

@Controller('otps')
export class OtpsController {

    constructor(private readonly otpService: OtpsService) { }

    @Post("/generate")
    async generateOtp(@Body() dto: GenerateOtpDto) {

        // return await this.otpService.generateOtp(dto);
    }

    @Post("/verify")
    async verifyOtp(@Body() dto: VerifyOtpDto) {

        // return await this.otpService.verifyOtp(dto);

    }


}
