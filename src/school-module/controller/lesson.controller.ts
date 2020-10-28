import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put, Query } from '@nestjs/common';
import { PaginationQueryDto } from '@/common/dto/pagination-query.dto';
import { LessonService } from '@/school/application/service/lesson.service';
import { CreateLessonRequest } from '@/school/application/service/lesson/create-lesson-request';
import { UpdateLessonRequest } from '@/school/application/service/lesson/update-lesson-request';
import { AddVideoRequest } from '@/school/application/service/lesson/add-video-request';
import { AddKeynoteRequest } from '@/school/application/service/lesson/add-keynote-request';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Lessons')
@Controller('lessons')
export class LessonController {
  constructor(
    private readonly lessonService: LessonService,
  ) {
  }

  @Get()
  async findAll(@Query() paginationQueryDto: PaginationQueryDto) {
    return await this.lessonService.findAll(paginationQueryDto);
  }

  @Get(':lessonHash')
  getOne(@Param('lessonHash') lessonHash: string) {
    return this.lessonService.getOne(lessonHash);
  }

  @Post()
  create(@Body() createLessonRequest: CreateLessonRequest) {
    return this.lessonService.create(createLessonRequest);
  }

  @Put(':lessonHash')
  update(
    @Param('lessonHash') lessonHash: string,
    @Body() updateLessonRequest: UpdateLessonRequest
  ) {
    return this.lessonService.update(lessonHash, updateLessonRequest);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':lessonHash')
  remove(@Param('lessonHash') lessonHash: string) {
    return this.lessonService.remove(lessonHash);
  }

  @Post(':lessonHash/videos')
  @HttpCode(HttpStatus.NO_CONTENT)
  addVideo(
    @Param('lessonHash') lessonHash: string,
    @Body() addVideoRequest: AddVideoRequest
  ) {
    return this.lessonService.addVideo(lessonHash, addVideoRequest);
  }

  @Get(':lessonHash/videos/:videoHash')
  getVideo(
    @Param('lessonHash') lessonHash: string,
    @Param('videoHash') videoHash: string
  ) {
    return this.lessonService.getVideo(lessonHash, videoHash);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':lessonHash/videos/:videoHash')
  removeVideo(
    @Param('lessonHash') lessonHash: string,
    @Param('videoHash') videoHash: string
  ) {
    return this.lessonService.removeVideo(lessonHash, videoHash);
  }

  @Post(':lessonHash/keynotes')
  @HttpCode(HttpStatus.NO_CONTENT)
  addKeynote(
    @Param('lessonHash') lessonHash: string,
    @Body() addKeynoteRequest: AddKeynoteRequest
  ) {
    return this.lessonService.addKeynote(lessonHash, addKeynoteRequest);
  }

  @Get(':lessonHash/keynotes/:keynoteHash')
  getKeynote(
    @Param('lessonHash') lessonHash: string,
    @Param('keynoteHash') keynoteHash: string
  ) {
    return this.lessonService.getKeynote(lessonHash, keynoteHash);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':lessonHash/keynotes/:keynoteHash')
  removeKeynote(
    @Param('lessonHash') lessonHash: string,
    @Param('keynoteHash') keynoteHash: string
  ) {
    return this.lessonService.removeKeynote(lessonHash, keynoteHash);
  }
}
