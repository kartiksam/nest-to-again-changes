import { ApiProperty } from "@nestjs/swagger";
import mongoose from "mongoose";

export class GenerateOtpDto {
    email: string;

}

// export class VerifyOtpDto {
//     @ApiProperty({ type: String }) // ✅ tell Swagger it's a string
//     userId: mongoose.Types.ObjectId;

//     @ApiProperty()
//     otp: string;

// }


export class VerifyOtpDto {
    @ApiProperty({ type: String })
    userId: mongoose.Types.ObjectId;

    @ApiProperty({ example: '123456', description: 'OTP sent to email or phone' })
    otp: string;

    @ApiProperty({
        example: 'signup',
        enum: ['signup', 'login'],
        description: 'Purpose of OTP verification',
    })
    context: 'signup' | 'login';
}
