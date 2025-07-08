import { ApiProperty } from "@nestjs/swagger";
import { AddressDto } from "./address-dto";

export class ResponseProfileDto {

    @ApiProperty()
    _id: string;

    @ApiProperty()
    address: AddressDto;

    @ApiProperty()
    contactNUmber: number;

    @ApiProperty()
    createdAt: Date;

    @ApiProperty()
    updatedAt: Date;

    @ApiProperty()
    createdBy: string;
}