import { ApiProperty } from "@nestjs/swagger";

export class ResponseCommentDto {
    @ApiProperty()
    _id: string;

    @ApiProperty()
    messsage: string;

    @ApiProperty()
    createdBy: string;

}