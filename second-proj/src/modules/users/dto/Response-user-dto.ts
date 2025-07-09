import { ApiProperty } from "@nestjs/swagger";
import { Types } from "mongoose";
export class ResponseUserDto {

    @ApiProperty()
    _id: string;

    @ApiProperty()
    name: string;

    @ApiProperty()
    email: string;


    @ApiProperty()
    createdBy?: Types.ObjectId;
}