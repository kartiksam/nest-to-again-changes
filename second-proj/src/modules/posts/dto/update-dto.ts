import { ApiProperty } from "@nestjs/swagger";

export class UpdateDto {
    @ApiProperty()
    title: string;

    @ApiProperty()
    description: string;

    @ApiProperty()
    image: string;

    @ApiProperty()
    likesCount: number;

}