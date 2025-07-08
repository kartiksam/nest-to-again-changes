/**
 * Schema of ErrorLogs 
 */

import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";

interface WithTime{
    createdOn:Date
}

@Schema({timestamps:true})
export class ErrorLog extends Document{
    @Prop({ required: true })
    message: string
    
    @Prop()
    statusCode: number
    
    @Prop()
    path: string
    
    @Prop()
    method: string

    @Prop()
    userId: Types.ObjectId
    
    
    @Prop()
    reason: string
    
    @Prop()
    stack: string
    
    @Prop()
    createdAt?: Date
    @Prop()
    updatedAt?:Date
}

export const ErrorLogSchema=SchemaFactory.createForClass(ErrorLog)