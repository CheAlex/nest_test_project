import { Injectable } from '@nestjs/common';
import { PaginationQueryDto } from '@/common/dto/pagination-query.dto';
import { ModelNotFoundException } from '@/common/domain/exception/model-not-found-exception';
import { PaginationUtil } from '@/common/dal/pagination-util';
import { LessonRepository } from '@/school/domain/lesson/lesson.repository';
import { CreateLessonRequest } from '@/school/application/service/lesson/create-lesson-request';
import { UpdateLessonRequest } from '@/school/application/service/lesson/update-lesson-request';
import { Lesson } from '@/school/domain/lesson/lesson';
import { VideoRepository } from '@/school/domain/video/video.repository';
import { KeynoteRepository } from '@/school/domain/keynote/keynote.repository';
import { v4 as uuidv4 } from 'uuid';
import { AddVideoRequest } from '@/school/application/service/lesson/add-video-request';
import { AddKeynoteRequest } from '@/school/application/service/lesson/add-keynote-request';
import { Content } from '@/school/domain/lesson/lesson/content';

@Injectable()
export class LessonService {
  constructor(
    private readonly lessonRepository:  LessonRepository,
    private readonly videoRepository:   VideoRepository,
    private readonly keynoteRepository: KeynoteRepository,
    private readonly paginationUtil:    PaginationUtil,
  ) {}

  findAll(paginationQueryDto: PaginationQueryDto) {
    const { limit, offset } = this.paginationUtil.calculateLimitAndOffset(paginationQueryDto);

    return this.lessonRepository.find({
      relations: ['content.videos', 'content.keynotes'],
      skip: offset,
      take: limit,
      order: {hash: 'ASC'},
    });
  }

  async getOne(hash: string) {
    const lesson = await this.lessonRepository.findOne(hash, {
      relations: ['content.videos', 'content.keynotes'],
    });

    if (!lesson) {
      throw ModelNotFoundException.fromClassAndId('Lesson', hash);
    }

    return lesson;
  }

  async create(createLessonRequest: CreateLessonRequest) {
    const hash     = uuidv4();
    const videos   = await this.videoRepository.findByIds(createLessonRequest.content.videos);
    const keynotes = await this.keynoteRepository.findByIds(createLessonRequest.content.keynotes);

    const lesson = new Lesson(
      hash,
      createLessonRequest.title,
      createLessonRequest.description,
      createLessonRequest.order,
      new Content(videos, keynotes)
    );

    await this.lessonRepository.save(lesson);

    return { hash };
  }

  async update(hash: string, updateLessonRequest: UpdateLessonRequest) {
    const lesson   = await this.getOne(hash);
    const videos   = await this.videoRepository.findByIds(updateLessonRequest.content.videos);
    const keynotes = await this.keynoteRepository.findByIds(updateLessonRequest.content.keynotes);

    lesson.update(
      updateLessonRequest.title,
      updateLessonRequest.description,
      updateLessonRequest.order,
      new Content(videos, keynotes)
    );

    return this.lessonRepository.save(lesson);
  }

  async remove(hash: string) {
    const lesson = await this.getOne(hash);

    return this.lessonRepository.remove(lesson);
  }

  async addVideo(lessonHash: string, addVideoRequest: AddVideoRequest) {
    const lesson = await this.lessonRepository.findOne(lessonHash, {
      relations: ['content.videos'],
    });

    if (!lesson) {
      throw ModelNotFoundException.fromClassAndId('Lesson', lessonHash);
    }

    const video = await this.videoRepository.findOne(addVideoRequest.videoHash);

    if (!video) {
      throw ModelNotFoundException.fromClassAndId('Video', addVideoRequest.videoHash);
    }

    lesson.addContentVideo(video);

    return this.lessonRepository.save(lesson);
  }

  async getVideo(lessonHash: string, videoHash: string) {
    const lesson = await this.getOne(lessonHash);

    const video = lesson.content.findVideo(videoHash);

    if (!video) {
      throw ModelNotFoundException.fromClassAndId('Video', videoHash);
    }

    return video;
  }

  async removeVideo(lessonHash: string, videoHash: string) {
    const lesson = await this.lessonRepository.findOne(lessonHash, {
      relations: ['content.videos'],
    });

    if (!lesson) {
      throw ModelNotFoundException.fromClassAndId('Lesson', lessonHash);
    }

    const video = lesson.content.findVideo(videoHash);

    if (!video) {
      throw ModelNotFoundException.fromClassAndId('Video', videoHash);
    }

    lesson.removeContentVideo(video);

    return this.lessonRepository.save(lesson);
  }

  async addKeynote(lessonHash: string, addKeynoteRequest: AddKeynoteRequest) {
    const lesson = await this.lessonRepository.findOne(lessonHash, {
      relations: ['content.keynotes'],
    });

    if (!lesson) {
      throw ModelNotFoundException.fromClassAndId('Lesson', lessonHash);
    }

    const keynote = await this.keynoteRepository.findOne(addKeynoteRequest.keynoteHash);

    if (!keynote) {
      throw ModelNotFoundException.fromClassAndId('Keynote', addKeynoteRequest.keynoteHash);
    }

    lesson.addContentKeynote(keynote);

    return this.lessonRepository.save(lesson);
  }

  async getKeynote(lessonHash: string, keynoteHash: string) {
    const lesson = await this.getOne(lessonHash);

    const keynote = lesson.content.findKeynote(keynoteHash);

    if (!keynote) {
      throw ModelNotFoundException.fromClassAndId('Keynote', keynoteHash);
    }

    return keynote;
  }

  async removeKeynote(lessonHash: string, keynoteHash: string) {
    const lesson = await this.lessonRepository.findOne(lessonHash, {
      relations: ['content.keynotes'],
    });

    if (!lesson) {
      throw ModelNotFoundException.fromClassAndId('Lesson', lessonHash);
    }

    const keynote = lesson.content.findKeynote(keynoteHash);

    if (!keynote) {
      throw ModelNotFoundException.fromClassAndId('Keynote', keynoteHash);
    }

    lesson.removeContentKeynote(keynote);

    return this.lessonRepository.save(lesson);
  }
}
