import { Injectable } from '@nestjs/common';
import { CreateUserRequest } from '@/identity/application/service/user/create-user-request';
import { UserRepository } from '@/identity/domain/model/user.repository';
import { PaginationQueryDto } from '@/common/dto/pagination-query.dto';
import { ModelNotFoundException } from '@/common/domain/exception/model-not-found-exception';
import { User } from '@/identity/domain/model/user';
import { UpdateUserRequest } from '@/identity/application/service/user/update-user-request';
import { PaginationUtil } from '@/common/dal/pagination-util';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly paginationUtil: PaginationUtil,
  ) {}

  findAll(paginationQueryDto: PaginationQueryDto) {
    const { limit, offset } = this.paginationUtil.calculateLimitAndOffset(paginationQueryDto);

    return this.userRepository.find({
      skip: offset,
      take: limit,
      order: {hash: 'ASC'},
    });
  }

  async getOne(hash: string) {
    const user = await this.userRepository.findOne(hash);

    if (!user) {
      throw ModelNotFoundException.fromClassAndId('User', hash);
    }

    return user;
  }

  async create(createUserRequest: CreateUserRequest) {
    const hash = uuidv4();
    const user = this.userRepository.create({
      hash,
      ...createUserRequest
    });

    await this.userRepository.save(user);

    return { hash };
  }

  async update(hash: string, updateUserRequest: UpdateUserRequest) {
    const user = await this.userRepository.preload({
      hash,
      ...updateUserRequest
    });

    if (!user) {
      throw ModelNotFoundException.fromClassAndId('User', hash);
    }

    return this.userRepository.save(user);
  }

  async remove(hash: string) {
    const user = await this.getOne(hash);

    return this.userRepository.remove(user);
  }
}
