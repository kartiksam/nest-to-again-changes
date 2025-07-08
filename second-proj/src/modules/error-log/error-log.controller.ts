/**
 * Controller to Fetch all the Logs saved in Database
 */
import { Controller, Get, Post } from '@nestjs/common';
import { ErrorLogService } from './error-log.service';

@Controller('error-log')
export class ErrorLogController {
    constructor(private logService: ErrorLogService) { }
  
    @Get()
    getAllLogs() {
        return this.logService.GetErroLog()
    }
}
