import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/loginDto';
import { RegisterDto } from './dto/registerDto';
import { KartikAuth } from './auth';
import { ApiBearerAuth } from '@nestjs/swagger';
import { RolesGuard } from './role.guard.service';
import { Roles } from 'src/decorators/roles.decorator';
import { Role } from 'src/enums/role';
import { Request } from 'express';
import { VerifyOtpDto } from '../otps/dto/otp.dto';
import { OtpsService } from '../otps/otps.service';

@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService, private otpService: OtpsService) { }
    @Post('login')
    async login(@Body() loginDto: LoginDto, @Req() req: Request) {
        const user = await this.authService.validateUser(loginDto, req);
        return this.authService.generateToken(user);
    }

    @Post('register')
    async register(@Body() registerDto: RegisterDto) {
        return this.authService.register(registerDto);
    }

    @Post('verify-otp')
    async verifyOtp(@Body() dto: VerifyOtpDto) {
        return this.authService.verifyOtp(dto);
    }

    @Get('me')
    @UseGuards(KartikAuth, RolesGuard)
    @Roles(Role.USER)
    @ApiBearerAuth()
    getProfile(@Req() request: Request) {
        // This will return whatever you put in request['user'] in your guard
        return {
            message: 'Token payload attached to request',
            user: request['user'],
        };
    }
}
