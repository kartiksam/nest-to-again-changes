// src/modules/permissions/permission.service.ts
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Permission, PermissionDocument } from '../../schema/permission-schema';
import { Model } from 'mongoose';

@Injectable()
export class PermissionService {
    constructor(
        @InjectModel(Permission.name)
        private permissionModel: Model<PermissionDocument>,
    ) { }


    async assignPermissions(userId: string, endpoints: string[]) {
        return this.permissionModel.findOneAndUpdate(
            { userId },
            { endpoints },
            { upsert: true, new: true }
        );
    }


    async getPermissionsByUserId(userId: string): Promise<string[]> {
        const record = await this.permissionModel.findOne({ userId });
        return record?.endPoints || [];
    }


    async updatePermissions(userId: string, endpoints: string[]) {
        return this.assignPermissions(userId, endpoints);
    }


    async removePermissions(userId: string) {
        return this.permissionModel.deleteOne({ userId });
    }


    async getAllPermissions() {
        return this.permissionModel.find().populate('userId');
    }
}
