// src/modules/permissions/permission.controller.ts
import {
    Controller,
    Post,
    Body,
    Param,
    Get,
    Patch,
    Delete,
} from '@nestjs/common';
import { PermissionService } from './permission.service';
import { ApiTags } from '@nestjs/swagger';


@ApiTags('Permissions')
@Controller('permissions')
export class PermissionController {
    constructor(private readonly permissionService: PermissionService) { }

    @Post()
    assignPermissions(
        @Body() body: { userId: string; endpoints: string[] }
    ) {
        return this.permissionService.assignPermissions(body.userId, body.endpoints);
    }

    @Get(':userId')
    getUserPermissions(@Param('userId') userId: string) {
        return this.permissionService.getPermissionsByUserId(userId);
    }

    @Patch(':userId')
    updatePermissions(
        @Param('userId') userId: string,
        @Body() body: { endpoints: string[] }
    ) {
        return this.permissionService.updatePermissions(userId, body.endpoints);
    }

    @Delete(':userId')
    removePermissions(@Param('userId') userId: string) {
        return this.permissionService.removePermissions(userId);
    }
}
