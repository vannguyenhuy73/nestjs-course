import { ApiProperty } from "@nestjs/swagger";

export  class UpdateCourseDto{
    @ApiProperty({required:false})
    title: string;

    @ApiProperty({required:false})
    description?:string;

    @ApiProperty({required:false})
    author?:string;

    @ApiProperty({required:false})
    url?:string;
}