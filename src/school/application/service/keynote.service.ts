import { Injectable } from '@nestjs/common';
import { PaginationQueryDto } from '@/common/dto/pagination-query.dto';
import { ModelNotFoundException } from '@/common/domain/exception/model-not-found-exception';
import { PaginationUtil } from '@/common/dal/pagination-util';
import { KeynoteRepository } from '@/school/domain/keynote/keynote.repository';
import { CreateKeynoteRequest } from '@/school/application/service/keynote/create-video-request';
import { UpdateKeynoteRequest } from '@/school/application/service/keynote/update-video-request';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class KeynoteService {
  constructor(
    private readonly keynoteRepository: KeynoteRepository,
    private readonly paginationUtil: PaginationUtil,
  ) {}

  findAll(paginationQueryDto: PaginationQueryDto) {
    const { limit, offset } = this.paginationUtil.calculateLimitAndOffset(paginationQueryDto);

    return this.keynoteRepository.find({
      skip: offset,
      take: limit,
      order: {hash: 'ASC'},
    });
  }

  async getOne(hash: string) {
    const keynote = await this.keynoteRepository.findOne(hash);

    if (!keynote) {
      throw ModelNotFoundException.fromClassAndId('Keynote', hash);
    }

    return keynote;
  }

  async create(createKeynoteRequest: CreateKeynoteRequest) {
    const hash = uuidv4();
    const keynote = this.keynoteRepository.create({
      hash,
      ...createKeynoteRequest
    });

    await this.keynoteRepository.save(keynote);

    return { hash };
  }

  async update(hash: string, updateKeynoteRequest: UpdateKeynoteRequest) {
    const keynote = await this.keynoteRepository.preload({
      hash,
      ...updateKeynoteRequest
    });

    if (!keynote) {
      throw ModelNotFoundException.fromClassAndId('Keynote', hash);
    }

    return this.keynoteRepository.save(keynote);
  }

  async remove(hash: string) {
    const keynote = await this.getOne(hash);

    return this.keynoteRepository.remove(keynote);
  }
}
