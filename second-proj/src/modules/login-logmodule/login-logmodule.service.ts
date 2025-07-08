import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { LoginLog, LoginLogDocument } from './login.schema';
import { Model } from 'mongoose';
import { logDto } from './dto/login.dto';

@Injectable()
export class LoginLogService {

    constructor(@InjectModel(LoginLog.name) private readonly loginLogModel: Model<LoginLogDocument>) { }

    async logLogin(dto: logDto) {
        return this.loginLogModel.create(dto);
    }

    async getAllActivities() {
        return this.loginLogModel.find().sort({ createdAt: -1 }).exec(); // optional: latest first
    }
}
