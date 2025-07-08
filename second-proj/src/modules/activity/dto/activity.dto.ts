import { ApiProperty } from '@nestjs/swagger';

export class ActivityDto {
    @ApiProperty()
    userId: string;

    @ApiProperty()
    action: string;

    @ApiProperty()
    resource: string;

    @ApiProperty({ required: false })
    description?: string;

    @ApiProperty({ required: false })
    payload?: any;
}
