/**
 * Created an ErrorLogFilter class that is responsible for catching exceptions, storing it in database. 
 */
import {
  ArgumentsHost,
  ExceptionFilter,
  HttpException,
  Catch,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { ErrorLogService } from './error-log.service';


@Catch()
export class ErrorLogFilter implements ExceptionFilter {

  constructor(private errorLogsService: ErrorLogService) { }

  async catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const request = ctx.getRequest<Request>();
    const response = ctx.getResponse<Response>();

    const status =
      exception instanceof HttpException ? exception.getStatus() : 500;

    const message =
      exception instanceof HttpException
        ? exception.getResponse()
        : exception?.message || 'Unknown error';

    console.log(request, exception)

    await this.errorLogsService.CreateLog({
      statusCode: status,
      message: typeof message === 'string' ? message : JSON.stringify(message),
      path: request.url,
      method: request.method,
      reason: exception?.message || 'Unknown error',
      stack: exception?.stack || null,
    });


    response.status(status).json({
      statusCode: status,
      message,
    });
  }
}
