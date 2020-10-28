import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put, Query } from '@nestjs/common';
import { PaginationQueryDto } from '@/common/dto/pagination-query.dto';
import { VideoService } from '@/school/application/service/video.service';
import { CreateVideoRequest } from '@/school/application/service/video/create-video-request';
import { UpdateVideoRequest } from '@/school/application/service/video/update-video-request';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Videos')
@Controller('videos')
export class VideoController {
  constructor(
    private readonly videoService: VideoService,
  ) {
  }

  @Get()
  async findAll(@Query() paginationQueryDto: PaginationQueryDto) {
    return await this.videoService.findAll(paginationQueryDto);
  }

  @Get(':videoHash')
  getOne(@Param('videoHash') videoHash: string) {
    return this.videoService.getOne(videoHash);
  }

  @Post()
  create(@Body() createVideoRequest: CreateVideoRequest) {
    return this.videoService.create(createVideoRequest);
  }

  @Put(':videoHash')
  update(
    @Param('videoHash') videoHash: string,
    @Body() updateVideoRequest: UpdateVideoRequest
  ) {
    return this.videoService.update(videoHash, updateVideoRequest);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':videoHash')
  remove(@Param('videoHash') videoHash: string) {
    return this.videoService.remove(videoHash);
  }
}
