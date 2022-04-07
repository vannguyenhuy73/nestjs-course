import { Body, Controller, Delete, Get, NotFoundException, Param, Post, Put, Query } from '@nestjs/common';
import { ApiCreatedResponse, ApiHeader, ApiOkResponse, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CoursesService } from './courses.service';
import { CreateCourseDto } from './dto/create-course-dto';
import { UpdateCourseDto } from './dto/update-course-dto';
import { Course } from './entities/course.entity';

@Controller('courses')
export class CoursesController {
    constructor (private courseService: CoursesService){}//Dependency injection

    @ApiTags('courses')
    @ApiOkResponse({type:Course, isArray:true})
    @Get()
    getCourses():Course[] {
        return this.courseService.findAll();
    }

    @ApiTags('courses/search')
    @ApiOkResponse({type:Course, isArray:true})
    @Get('search')
    getCourseBySearch(@Query('q') q:string):Course[] {
        let courses:Course[] =  this.courseService.find(q);
        
        if(!courses.length){
            throw new NotFoundException({statusCode:404, message:"Không tìm thấy dữ liệu"});
        }
        return courses;
    }

    @ApiTags('courses/findById')
    @ApiOkResponse({type:Course, description:'The User'})
    @Get(':id')
    getCourseById(@Param('id') id:string):Course { //Lấy param id từ url
        let course:Course =  this.courseService.findById(Number(id));
        if(!Object.keys(course).length){
            throw new NotFoundException({statusCode: 404, message:'không tìm thấy khóa học'})
        }
        return course;
    }

    @ApiTags('courses/create')
    @ApiCreatedResponse({type:Course})
    @ApiResponse({status: 201, description: 'The record has been created'})
    @ApiResponse({status: 403, description: 'Forbidden'})
    @Post('store')
    createCourse(@Body() body: CreateCourseDto):any {
        return this.courseService.createCourse(body);
    }

    @ApiTags('course/update')
    @ApiCreatedResponse({type:Course, isArray:true})
    @ApiResponse({status: 201, description: 'The record has been updated'})
    @ApiResponse({status: 403, description: 'Forbidden'})
    @Put('update/:id')
    updateCourse(@Param('id') id:string, @Body() body: UpdateCourseDto):Course[] {
       return this.courseService.updateCourse(body, Number(id));
    }

    @ApiTags('course/delete')
    @Delete('delete/:id')
    deleteCourse(@Param('id') id:string):Course[]{
        return this.courseService.deleteCourse(Number(id));
    }
}
