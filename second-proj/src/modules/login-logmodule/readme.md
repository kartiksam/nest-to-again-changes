This is a plug-and-play Login Logging Module for NestJS that records every user login attempt (both successful and failed), capturing user ID, IP address, device info, and login status.

Logs both successful and failed login attempts

Records:

User ID

IP Address

Device/User-Agent

Login status (success or failed)

Timestamp (createdAt)

Prerequisites
This is an example of how to list things you need to use the software and how to install them.

npm
npm install bcrypt

Imports
import { Request } from 'express';
import \* as bcrypt from 'bcrypt';

Add this method into your userService

async findByEmail(email: string) {
return await this.userModel.findOne({ email: email });
}

🔧 How to Integrate
Import LoginModule in AppModule
Import LoginModule in AuthModule
Inject LoginLogService into AuthService
EXport LoginLogService from LoginModule so that it will be available in other modules
Update Your validateUser() Method in AuthService

async validateUser(dto: LoginDto, req: Request): Promise<any> {
const { email, password } = dto;

        const ipAddress =
            (req.headers['x-forwarded-for'] as string)?.split(',')[0]?.trim() ||
            req.socket?.remoteAddress ||
            'unknown';
        const userAgent = req.headers['user-agent'] || 'unknown';


        const user = await this.userService.findByEmail(email);


        if (!user) {
            await this.loginLogService.logLogin({
                userId: 'unknown',
                ipAddress,
                userAgent,
                status: StatusEnum.FAILED,
            });

            throw new UnauthorizedException('User not found');
        }


        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            await this.loginLogService.logLogin({
                userId: user._id.toString(),
                ipAddress,
                userAgent,
                status: StatusEnum.FAILED,
            });

            throw new UnauthorizedException('Invalid credentials');
        }


        await this.loginLogService.logLogin({
            userId: user._id.toString(),
            ipAddress,
            userAgent,
            status: StatusEnum.SUCCESS,
        });


        const { password: _, ...userWithoutPassword } = user.toObject?.() || user;
        return userWithoutPassword;
    }

Call validate user in Login Controller

async login(@Body() loginDto: LoginDto, @Req() req: Request)
const user = await this.authService.validateUser(loginDto, req);
