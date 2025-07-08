import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import * as  moment from "moment";
import { Types } from "mongoose";
import { Role } from "src/enums/role";


export type UserDocument = User & Document;
@Schema()
export class User {

    @Prop()
    name: string;

    @Prop()
    email: string;

    @Prop()
    password: string;

    @Prop({ enum: Role, default: Role.USER })
    role: Role

    @Prop({ type: Types.ObjectId, ref: 'UserDetails' })
    userDetails?: Types.ObjectId;

    @Prop({ default: true })
    isActive: boolean;

    @Prop()
    deletedAt?: Date;

    @Prop({ type: Number, default: moment().utc().valueOf() })
    created_at: number;

    @Prop({ type: Number, default: null })
    updated_at: number;

}

export const UserSchema = SchemaFactory.createForClass(User);