import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import * as moment from "moment";
import * as mongoose from "mongoose";
import { Document, Types } from "mongoose";

export type PostDocument = Posts & Document;
@Schema()
export class Posts {

    @Prop()
    title: string;

    @Prop()
    description: string;

    @Prop()
    image: string;

    @Prop()
    likesCount: number;

    @Prop({
        type: mongoose.Schema.Types.ObjectId, ref: 'User'
    })
    createdBy?: Types.ObjectId;

    @Prop({ type: Number, default: moment().utc().valueOf() })
    created_at: number;

    @Prop({ type: Number, default: null })
    updated_at: number;






}
export const PostsSchema = SchemaFactory.createForClass(Posts);