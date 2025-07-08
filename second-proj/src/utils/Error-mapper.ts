import { ErrorDto } from "src/modules/error-log/dto/error-log.dto"
import { ErrorLog } from "src/modules/error-log/entities/error-log.schema"

export function ToErrorLogResponse(logerror: ErrorLog): ErrorDto {
    const response: ErrorDto = {
        message: logerror.message,
        statusCode: logerror.statusCode,
        path: logerror.path,
        method: logerror.method,
        stack: logerror.stack,
        reason: logerror.reason,
        createdAt: logerror.createdAt,
        updatedAt: logerror.updatedAt
    }
    return response
}