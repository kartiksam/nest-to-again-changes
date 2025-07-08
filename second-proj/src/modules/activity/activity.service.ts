/**
 *  Service responsible for logging user activities to the database
 */
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ActitvityDocument, Activity } from './activity-Schema';
import { ActivityDto } from './dto/activity.dto';

@Injectable()

export class ActivityService {

    constructor(@InjectModel(Activity.name) private activityModel: Model<ActitvityDocument>) { }

    async logActivity(dto: ActivityDto) {

        const { userId, action, resource, description, payload } = dto;

        return this.activityModel.create({
            userId,
            action,
            resource,
            description,
            payload,
        });
    }


    async getAllActivities() {
        return this.activityModel.find().sort({ createdAt: -1 }).exec(); // optional: latest first
    }

}
