import { PassportSerializer } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { UserRepository } from '@/identity/domain/model/user.repository';

@Injectable()
export class SessionSerializer extends PassportSerializer {
  constructor(
    private readonly userRepository: UserRepository,
  ) {
    super();
  }

  serializeUser(user: any, done: (err: any, id?: any) => void): void {
    done(null, user.hash)
  }

  deserializeUser(hash: any, done: (err: any, id?: any) => void): void {
    this.userRepository
      .findOne({ hash })
      .then(user => done(null, user))
      .catch(error => done(error))
    ;
  }
}
