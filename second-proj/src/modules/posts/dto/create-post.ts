import { ApiProperty } from "@nestjs/swagger";
import { IsOptional } from "class-validator";

export class CreatePostDto {
    @ApiProperty()
    title: string;

    @ApiProperty()
    description: string;

    @ApiProperty()
    image: string;

    @ApiProperty()
    likesCount: number;

    @ApiProperty()
    @IsOptional()
    createdBy: string;

}