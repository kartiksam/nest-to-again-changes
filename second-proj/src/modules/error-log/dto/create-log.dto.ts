/**
 * DTO class Representing the field required for creating log
 */
import { IsNotEmpty } from "class-validator";
export class CreateLogDto{
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
}