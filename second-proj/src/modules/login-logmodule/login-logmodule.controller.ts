import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { LoginLogService } from './login-logmodule.service';

@Controller('login-logmodule')
export class LoginLogmoduleController {
    constructor(private readonly loginService: LoginLogService) { }
    @Get()
    @ApiOperation({ summary: 'Get all activity logs' })
    @ApiResponse({
        status: 200,
        description: 'List of all user activities',

    })
    async getAllActivities() {
        return this.loginService.getAllActivities();
    }
}

