import { Injectable, HttpException } from '@nestjs/common';
import { randomInt, randomUUID } from 'crypto';
import { COURSES } from './courses.mock';
import { CreateCourseDto } from './dto/create-course-dto';
import { UpdateCourseDto } from './dto/update-course-dto';
@Injectable()
export class CoursesService {
    private courses: any = COURSES;

    findAll(){
        return this.courses;
    }

    findById(courseId: number){
        let courseFound = this.courses.find(course=>course.id === courseId);
        return courseFound??{};
    }

    find(q:string){
        return this.courses.filter(course=>{
            console.log(course);
            
            return course.title.toLowerCase().includes(q.toLowerCase()) || course.description.toLowerCase().includes(q.toLowerCase())
                    || course.author.toLowerCase().includes(q.toLowerCase())
        })
    }

    createCourse(createCourseDto:CreateCourseDto){
        const newCourse = {
            id: randomInt(100),
            ...createCourseDto
        };
        this.courses.push(newCourse);
        return this.courses;
    }

    updateCourse(updateCourseDto:UpdateCourseDto, id:number){
        const updateCourse = {
            ...updateCourseDto
        };
        let courseIdx = this.courses.findIndex(course=>course.id === id);
        if(courseIdx > -1){
            this.courses[courseIdx] = updateCourse;
        }
        return this.courses;
    }

    deleteCourse(id:number){
        this.courses = [...this.courses.filter(course=>course.id !== id)]
        return this.courses;
    }
}

