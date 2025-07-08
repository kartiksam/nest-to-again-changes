import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose from "mongoose";


export type PermissionDocument = Permission & Document;

@Schema({ timestamps: true })
export class Permission {
    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
    userId: mongoose.Types.ObjectId;

    @Prop({ type: [String], required: true })
    endPoints: string[];

}

export const PermissionSchema = SchemaFactory.createForClass(Permission);