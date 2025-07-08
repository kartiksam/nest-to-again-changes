/**
 * DTO representing a single error log entry returned in API responses.
 * Contains essential details about where and why the error occurred.
 */
import { isNotEmpty, IsNotEmpty } from "class-validator";

export class ErrorDto{
    @IsNotEmpty()
    message: string
        
    @IsNotEmpty()
    statusCode: number
        
    @IsNotEmpty()
    path: string
        
    @IsNotEmpty()
    method: string
    
    @IsNotEmpty()
    stack:string
    
    @IsNotEmpty()
    reason: string
    
    createdAt?: Date
    
    updatedAt?:Date
}