/**
 * Schema for Activities
 */

import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import * as moment from 'moment';

export type ActitvityDocument = Activity & Document;

@Schema()
export class Activity {

    @Prop({ required: true })
    userId: string;

    @Prop()
    action: string;

    @Prop()
    resource: string;

    @Prop()
    description: string;

    @Prop({ type: Object })
    payload?: any;

    @Prop({ type: Number, default: moment().utc().valueOf() })
    created_at: number;


    @Prop({ type: Number, default: null })
    updated_at: number;

}
export const ActivityModel = SchemaFactory.createForClass(Activity);