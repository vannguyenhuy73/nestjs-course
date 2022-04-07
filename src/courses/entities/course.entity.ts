import { ApiProperty } from "@nestjs/swagger";

export class Course {
    @ApiProperty()
    id: string;

    @ApiProperty()
    title: string;

    @ApiProperty({required:false})
    description:string;

    @ApiProperty({required:false})
    author:string;

    @ApiProperty({required:false})
    url:string;
}