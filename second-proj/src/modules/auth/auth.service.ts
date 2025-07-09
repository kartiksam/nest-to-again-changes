import { BadRequestException, ConflictException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import * as jwt from "jsonwebtoken";
import { LoginDto } from './dto/loginDto';
import { RegisterDto } from './dto/registerDto';
import * as bcrypt from 'bcrypt';
import { LoginLogService } from '../login-logmodule/login-logmodule.service';
import { Request } from 'express';
import { StatusEnum } from '../login-logmodule/enums/StatusEnum';
import { OtpsService } from '../otps/otps.service';
import { ResponseUserDto } from '../users/dto/Response-user-dto';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from 'src/schema/user.Schema';
import { Model, Types } from 'mongoose';
import { UserService } from '../users/services/user.service';
import { toResponseDto } from 'src/utils/user-mapper';
import { VerifyOtpDto } from '../otps/dto/otp.dto';


@Injectable()
export class AuthService {
    constructor(@InjectModel(User.name) private userModel: Model<UserDocument>, private readonly userService: UserService, private readonly loginLogService: LoginLogService, private otpService: OtpsService) { }

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
        if (!user.isVerified) {
            // ✅ OTP not yet verified, so we send OTP
            await this.otpService.generateOtp(user._id);

            throw new UnauthorizedException('OTP sent. Please verify before logging in.');

        }

        const { password: _, ...userWithoutPassword } = user.toObject?.() || user;
        return userWithoutPassword;
    }


    async register(dto: RegisterDto): Promise<ResponseUserDto> {
        const { name, email, password, role } = dto;

        const existingUser = await this.userModel.findOne({ email });
        if (existingUser) {
            throw new ConflictException('User already exists');
        }
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        const user = new this.userModel({
            name,
            email, password: hashedPassword, role

        });
        await user.save();
        await this.otpService.generateOtp(user._id);

        return toResponseDto(user);
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


    async verifyOtp(dto: VerifyOtpDto) {
        const user = await this.userModel.findOne(new Types.ObjectId(dto.userId));
        if (!user) throw new NotFoundException('User not found');

        const result = await this.otpService.verifyOtp(dto);
        if (!result.success) throw new BadRequestException(result.message);

        if (dto.context === 'signup' && !user.isVerified) {
            await this.userService.markVerified(user._id.toString());
            return {
                success: true,
                message: 'User verified successfully. Please log in.',
            };
        }


        if (dto.context === 'login') {
            const token = this.generateToken(user);
            return {
                success: true,
                message: 'OTP verified. Login successful.',
                token,
            };
        }

        throw new BadRequestException('Invalid OTP verification context');
    }
}
