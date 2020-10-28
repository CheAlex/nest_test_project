import { Injectable } from '@nestjs/common';
import { PaginationQueryDto } from '@/common/dto/pagination-query.dto';
import { ModelNotFoundException } from '@/common/domain/exception/model-not-found-exception';
import { PaginationUtil } from '@/common/dal/pagination-util';
import { v4 as uuidv4 } from 'uuid';
import { ClassEntityRepository } from '@/school/domain/class/class-entity.repository';
import { CreateClassRequest } from '@/school/application/service/class/create-class-request';
import { ClassEntity } from '@/school/domain/class/class-entity';
import { Duration } from '@/school/domain/class/class-entity/duration';
import { UpdateClassRequest } from '@/school/application/service/class/update-class-request';
import { AddLessonRequest } from '@/school/application/service/class/add-lesson-request';
import { LessonRepository } from '@/school/domain/lesson/lesson.repository';
import { EnrollUserRequest } from '@/school/application/service/class/enroll-user-request';
import { UserRepository } from '@/identity/domain/model/user.repository';
import { ExpelUserRequest } from '@/school/application/service/class/expel-user-request';

@Injectable()
export class ClassService {
  constructor(
    private readonly classEntityRepository: ClassEntityRepository,
    private readonly lessonRepository:      LessonRepository,
    private readonly userRepository:        UserRepository,
    private readonly paginationUtil:        PaginationUtil,
  ) {}

  findAll(paginationQueryDto: PaginationQueryDto) {
    const { limit, offset } = this.paginationUtil.calculateLimitAndOffset(paginationQueryDto);

    return this.classEntityRepository.find({
      relations: ['users', 'lessons'],
      skip: offset,
      take: limit,
      order: {hash: 'ASC'},
    });
  }

  async getOne(hash: string) {
    const classEntity = await this.classEntityRepository.findOne(hash, {
      relations: ['users', 'lessons'],
    });

    if (!classEntity) {
      throw ModelNotFoundException.fromClassAndId('ClassEntity', hash);
    }

    return classEntity;
  }

  async create(createClassRequest: CreateClassRequest) {
    const hash        = uuidv4();
    const classEntity = new ClassEntity(
      hash,
      createClassRequest.title,
      createClassRequest.description,
      createClassRequest.order,
      new Duration(
        createClassRequest.duration.started,
        createClassRequest.duration.closed
      )
    );

    await this.classEntityRepository.save(classEntity);

    return { hash };
  }

  async update(hash: string, updateClassRequest: UpdateClassRequest) {
    const classEntity = await this.getOne(hash);

    classEntity.update(
      updateClassRequest.title,
      updateClassRequest.description,
      updateClassRequest.order,
      new Duration(
        updateClassRequest.duration.started,
        updateClassRequest.duration.closed
      )
    );

    return this.classEntityRepository.save(classEntity);
  }

  async remove(hash: string) {
    const classEntity = await this.getOne(hash);

    return this.classEntityRepository.remove(classEntity);
  }

  async addLesson(classHash: string, addLessonRequest: AddLessonRequest) {
    const classEntity = await this.classEntityRepository.findOne(classHash, {
      relations: ['lessons'],
    });

    if (!classEntity) {
      throw ModelNotFoundException.fromClassAndId('ClassEntity', classHash);
    }

    const lesson = await this.lessonRepository.findOne(addLessonRequest.lessonHash);

    if (!lesson) {
      throw ModelNotFoundException.fromClassAndId('Lesson', addLessonRequest.lessonHash);
    }

    classEntity.addLesson(lesson);

    await this.classEntityRepository.save(classEntity);

    return { hash: addLessonRequest.lessonHash };
  }

  async removeLesson(classHash: string, lessonHash: string) {
    const classEntity = await this.getOne(classHash);

    const lesson = classEntity.findLesson(lessonHash);

    if (!lesson) {
      throw ModelNotFoundException.fromClassAndId('Lesson', lessonHash);
    }

    classEntity.removeLesson(lesson);

    return this.classEntityRepository.save(classEntity);
  }

  async enrollUser(classHash: string, enrollUserRequest: EnrollUserRequest) {
    const classEntity = await this.classEntityRepository.findOne(classHash, {
      relations: ['users'],
    });

    if (!classEntity) {
      throw ModelNotFoundException.fromClassAndId('ClassEntity', classHash);
    }

    const user = await this.userRepository.findOne(enrollUserRequest.userHash);

    if (!user) {
      throw ModelNotFoundException.fromClassAndId('User', enrollUserRequest.userHash);
    }

    classEntity.enrollUser(user);

    await this.classEntityRepository.save(classEntity);
  }

  async expelUser(classHash: string, expelUserRequest: ExpelUserRequest) {
    const classEntity = await this.getOne(classHash);

    const user = classEntity.findUser(expelUserRequest.userHash);

    if (!user) {
      throw ModelNotFoundException.fromClassAndId('User', expelUserRequest.userHash);
    }

    classEntity.expelUser(user);

    return this.classEntityRepository.save(classEntity);
  }
}
