import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put, Query } from '@nestjs/common';
import { PaginationQueryDto } from '@/common/dto/pagination-query.dto';
import { ClassService } from '@/school/application/service/class.service';
import { CreateClassRequest } from '@/school/application/service/class/create-class-request';
import { UpdateClassRequest } from '@/school/application/service/class/update-class-request';
import { AddLessonRequest } from '@/school/application/service/class/add-lesson-request';
import { EnrollUserRequest } from '@/school/application/service/class/enroll-user-request';
import { ExpelUserRequest } from '@/school/application/service/class/expel-user-request';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Classes')
@Controller('classes')
export class ClassController {
  constructor(
    private readonly classService: ClassService,
  ) {
  }

  @Get()
  async findAll(@Query() paginationQueryDto: PaginationQueryDto) {
    return await this.classService.findAll(paginationQueryDto);
  }

  @Get(':classHash')
  getOne(@Param('classHash') hash: string) {
    return this.classService.getOne(hash);
  }

  @Post()
  create(@Body() createClassRequest: CreateClassRequest) {
    return this.classService.create(createClassRequest);
  }

  @Put(':classHash')
  update(
    @Param('classHash') classHash: string,
    @Body() updateClassRequest: UpdateClassRequest
  ) {
    return this.classService.update(classHash, updateClassRequest);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':classHash')
  remove(@Param('classHash') hash: string) {
    return this.classService.remove(hash);
  }

  @Post(':classHash/lessons')
  addLesson(
    @Param('classHash') classHash: string,
    @Body() addLessonRequest: AddLessonRequest
  ) {
    return this.classService.addLesson(classHash, addLessonRequest);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':classHash/lessons/:lessonHash')
  removeLesson(
    @Param('classHash') classHash: string,
    @Param('lessonHash') lessonHash: string
  ) {
    return this.classService.removeLesson(classHash, lessonHash);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Post(':classHash/enroll')
  enrollUser(
    @Param('classHash') classHash: string,
    @Body() enrollUserRequest: EnrollUserRequest
  ) {
    return this.classService.enrollUser(classHash, enrollUserRequest);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Post(':classHash/expel')
  expelUser(
    @Param('classHash') classHash: string,
    @Body() expelUserRequest: ExpelUserRequest
  ) {
    return this.classService.expelUser(classHash, expelUserRequest);
  }
}
