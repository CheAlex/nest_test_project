import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from '@/identity/application/service/user.service';
import { AuthenticationService } from '@/identity/domain/service/user/authentication.service';
import { UserRepository } from '@/identity/domain/model/user.repository';
import { LocalStrategy } from '@/identity/infrastructure/passport/local.strategy';
import { PassportModule } from '@nestjs/passport';
import { SessionSerializer } from '@/identity/infrastructure/passport/session.serializer';
import { UserController } from '@/identity-module/controller/user.controller';
import { AuthenticationController } from '@/identity-module/controller/authentication.controller';
import { CommonModule } from '@/common-module/common.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      UserRepository,
    ]),
    PassportModule.register({
      session: true,
    }),
    CommonModule,
  ],
  controllers: [
    UserController,
    AuthenticationController,
  ],
  providers: [
    // app-services
    UserService,

    // domain-services
    AuthenticationService,

    // infrastructure
    LocalStrategy,
    SessionSerializer,
  ],
})
export class IdentityModule {}
