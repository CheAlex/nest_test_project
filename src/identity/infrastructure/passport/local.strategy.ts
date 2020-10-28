import { PassportStrategy } from '@nestjs/passport';
import { BadRequestException, Injectable } from '@nestjs/common';
import { AuthenticationService } from '@/identity/domain/service/user/authentication.service';

const BaseStrategy = require('./strategy/base-strategy');

@Injectable()
export class LocalStrategy extends PassportStrategy(BaseStrategy) {
  constructor(private authService: AuthenticationService) {
    super();
  }

  async validate(email: string, password: string): Promise<any> {
    const user = await this.authService.validateUser(email, password);

    if (!user) {
      throw new BadRequestException('Wrong credentials.');
    }

    return user;
  }
}
