import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Address } from "./address-Schema";
import * as mongoose from "mongoose";
import * as  moment from "moment";

export type UserDetailsDocument = UserDetails & Document;

@Schema()
export class UserDetails {

    @Prop()
    address: Address;

    @Prop()
    contactNumber: number;

    @Prop()
    image?: string;

    @Prop({ type: Number, default: moment().utc().valueOf() })
    created_at: number;

    @Prop({ type: Number, default: null })
    updated_at: number;







}

export const UserDetailsSchema = SchemaFactory.createForClass(UserDetails); 