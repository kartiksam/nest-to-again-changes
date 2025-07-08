import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import * as moment from "moment";
import * as mongoose from "mongoose";
import { Document, Types } from 'mongoose';
export type CommentsDocument = Comments & Document;

@Schema()
export class Comments {

    @Prop()
    text: string;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
    createdBy?: Types.ObjectId;;

    @Prop({ type: mongoose.Types.ObjectId, ref: 'Post' })
    post: Types.ObjectId;

    @Prop({ type: Number, default: moment().utc().valueOf() })
    created_at: number;

    @Prop({ type: Number, default: null })
    updated_at: number;







}
export const CommentsSchema = SchemaFactory.createForClass(Comments);