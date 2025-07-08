/**
 * Module For Error Logging
 */

import { Module } from '@nestjs/common';
import { ErrorLogController } from './error-log.controller';
import { ErrorLogService } from './error-log.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ErrorLog, ErrorLogSchema } from './entities/error-log.schema';



@Module({
  imports: [MongooseModule.forFeature([{ name: ErrorLog.name, schema: ErrorLogSchema }])],
  controllers: [ErrorLogController],
  providers: [ErrorLogService],
  exports: [ErrorLogService]
})
export class ErrorLogModule { }
