import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import * as moment from "moment";
import { StatusEnum } from "./enums/StatusEnum";

export type LoginLogDocument = LoginLog & Document;

@Schema()
export class LoginLog {

    @Prop({ required: true })
    user_id: string;

    @Prop()
    ip?: string;

    @Prop()
    user_agent?: string;

    @Prop({ enum: StatusEnum })
    status?: StatusEnum;

    @Prop({ type: Number, default: moment().utc().valueOf() })
    created_at: number;

    @Prop({ type: Number, default: null })
    updated_at: number
}
export const LoginLogSchema = SchemaFactory.createForClass(LoginLog);