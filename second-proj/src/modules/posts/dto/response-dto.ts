import { ApiProperty } from "@nestjs/swagger";

export class ResponsePostDto {
    @ApiProperty()
    title: string;

    @ApiProperty()
    createdBy: string;
}