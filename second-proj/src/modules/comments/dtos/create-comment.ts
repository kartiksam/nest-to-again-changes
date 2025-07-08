import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, IsString } from "class-validator";

export class createCommentsDto {

    @ApiProperty()
    @IsString()
    message: string;

    @ApiProperty()
    @IsOptional()
    @IsString()
    createdBy: string;
}