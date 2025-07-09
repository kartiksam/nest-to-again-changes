import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Document, Types } from "mongoose";


export type OtpDocument = Otp & Document;
@Schema()
export class Otp {
    @Prop({ type: Types.ObjectId, ref: 'User', required: true })
    userId: Types.ObjectId;


    @Prop({ required: true })
    otp: string;

    @Prop()
    expiresAt: Date;


}

export const OtpSchema = SchemaFactory.createForClass(Otp);