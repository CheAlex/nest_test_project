import { Injectable } from '@nestjs/common';
import { UserRepository } from '@/identity/domain/model/user.repository';

@Injectable()
export class AuthenticationService {
  constructor(
    private readonly userRepository: UserRepository,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.userRepository.findOne({ email })

    if (user && password === user.password) {
      const { password, ...result } = user;

      return result;
    }

    return null;
  }
}
