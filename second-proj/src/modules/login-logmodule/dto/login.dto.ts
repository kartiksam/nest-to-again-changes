import { ApiProperty } from "@nestjs/swagger";
import { StatusEnum } from "../enums/StatusEnum";

export class logDto {

    @ApiProperty()
    user_id: string;

    @ApiProperty({ required: false })
    ip?: string;

    @ApiProperty({ required: false })
    user_agent?: string;

    @ApiProperty({ enum: StatusEnum })
    status?: StatusEnum;

}