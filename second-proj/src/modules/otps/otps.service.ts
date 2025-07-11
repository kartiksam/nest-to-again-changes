import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Otp, OtpDocument } from './otp.schema';
import { Model, Types } from 'mongoose';
import { VerifyOtpDto } from './dto/otp.dto';
import { UserService } from '../users/services/user.service';
import { EmailService } from '../email/email.service';
import { User, UserDocument } from 'src/schema/user.Schema';
import { Cron, CronExpression } from '@nestjs/schedule';


@Injectable()
export class OtpsService {

    constructor(@InjectModel(Otp.name) private otpModel: Model<OtpDocument>, @InjectModel(User.name) private userModel: Model<UserDocument>, private readonly userService: UserService, private readonly emailService: EmailService) { }


    @Cron(CronExpression.EVERY_5_MINUTES)
    async deleteExpiredOtps() {
        const now = new Date();
        const result = await this.otpModel.deleteMany({ expiresAt: { $lt: now } });
        console.log(`🧹 CronJob: Deleted ${result.deletedCount} expired OTP(s)`);

    }

    async generateOtp(userId: Types.ObjectId) {
        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        const expiresAt = new Date(Date.now() + 3 * 60 * 1000);

        await this.otpModel.deleteMany({ userId });
        await this.otpModel.create({
            userId: new Types.ObjectId(userId),
            otp,
            expiresAt
        })

        const user = await this.userModel.findById(userId);
        if (!user || !user.email) {
            return { message: 'User email not found' };
        }


        await this.emailService.sendEmail({
            recipients: [user.email],
            subject: 'Your OTP Code',
            html: `<p>Your OTP is <strong>${otp}</strong>. It will expire in 3 minutes.</p>`,
        });
        console.log(`Generated Otp for ${userId}: ${otp}`);
        return { message: `OPt sent successfully on email ${user.email}` };

    }

    async verifyOtp(dto: VerifyOtpDto) {
        const record = await this.otpModel.findOne({ userId: new Types.ObjectId(dto.userId) });

        if (!record) {
            return { success: false, message: 'No Otp found for this user' };
        }

        const now = new Date();
        if (now > record.expiresAt) {
            await this.otpModel.deleteOne({ _id: record._id });
            return { success: false, message: "Otp Expired" };
        }

        if (record.otp != dto.otp) {
            return { sucess: false, message: "Invalid Otp" };
        }

        await this.otpModel.deleteOne({ _id: record._id });
        await this.userService.markVerified(dto.userId.toString());

        return { success: true, message: 'Otp Verified Successfully' };

    }

}
