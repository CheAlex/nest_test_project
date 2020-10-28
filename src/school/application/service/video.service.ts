import { Injectable } from '@nestjs/common';
import { PaginationQueryDto } from '@/common/dto/pagination-query.dto';
import { ModelNotFoundException } from '@/common/domain/exception/model-not-found-exception';
import { PaginationUtil } from '@/common/dal/pagination-util';
import { VideoRepository } from '@/school/domain/video/video.repository';
import { CreateVideoRequest } from '@/school/application/service/video/create-video-request';
import { UpdateVideoRequest } from '@/school/application/service/video/update-video-request';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class VideoService {
  constructor(
    private readonly videoRepository: VideoRepository,
    private readonly paginationUtil: PaginationUtil,
  ) {}

  findAll(paginationQueryDto: PaginationQueryDto) {
    const { limit, offset } = this.paginationUtil.calculateLimitAndOffset(paginationQueryDto);

    return this.videoRepository.find({
      skip: offset,
      take: limit,
      order: {hash: 'ASC'},
    });
  }

  async getOne(hash: string) {
    const video = await this.videoRepository.findOne(hash);

    if (!video) {
      throw ModelNotFoundException.fromClassAndId('Video', hash);
    }

    return video;
  }

  async create(createVideoRequest: CreateVideoRequest) {
    const hash = uuidv4();
    const video = this.videoRepository.create({
      hash,
      ...createVideoRequest
    });

    await this.videoRepository.save(video);

    return { hash };
  }

  async update(hash: string, updateVideoRequest: UpdateVideoRequest) {
    const video = await this.videoRepository.preload({
      hash,
      ...updateVideoRequest
    });

    if (!video) {
      throw ModelNotFoundException.fromClassAndId('Video', hash);
    }

    return this.videoRepository.save(video);
  }

  async remove(hash: string) {
    const video = await this.getOne(hash);

    return this.videoRepository.remove(video);
  }
}
