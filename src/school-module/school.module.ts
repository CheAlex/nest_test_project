import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VideoRepository } from '@/school/domain/video/video.repository';
import { CommonModule } from '@/common-module/common.module';
import { VideoController } from '@/school-module/controller/video.controller';
import { VideoService } from '@/school/application/service/video.service';
import { KeynoteService } from '@/school/application/service/keynote.service';
import { KeynoteController } from '@/school-module/controller/keynote.controller';
import { KeynoteRepository } from '@/school/domain/keynote/keynote.repository';
import { LessonRepository } from '@/school/domain/lesson/lesson.repository';
import { LessonService } from '@/school/application/service/lesson.service';
import { LessonController } from '@/school-module/controller/lesson.controller';
import { ClassEntityRepository } from '@/school/domain/class/class-entity.repository';
import { ClassService } from '@/school/application/service/class.service';
import { ClassController } from '@/school-module/controller/class.controller';
import { IdentityModule } from '@/identity-module/identity.module';
import { UserRepository } from '@/identity/domain/model/user.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      VideoRepository,
      KeynoteRepository,
      LessonRepository,
      ClassEntityRepository,
      UserRepository
    ]),
    CommonModule,
    IdentityModule,
  ],
  controllers: [
    VideoController,
    KeynoteController,
    LessonController,
    ClassController,
  ],
  providers: [
    // app-services
    VideoService,
    KeynoteService,
    LessonService,
    ClassService,
  ],
})
export class SchoolModule {}
