import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { CoursesController } from './courses.controller';
import { CoursesService } from './courses.service';
import { RoleMiddleware } from './middlewares/role.middleware';
import { RoleSwaggerMiddleware } from './middlewares/roleswagger.middleware';

@Module({
  controllers: [CoursesController],
  providers: [CoursesService]
})
export class CoursesModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(RoleSwaggerMiddleware, RoleMiddleware).forRoutes('courses');
  }
}
