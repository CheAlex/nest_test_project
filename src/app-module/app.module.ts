import { Module, ValidationPipe } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { APP_FILTER, APP_GUARD, APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core';
import { HttpExceptionFilter } from '@/common-module/filters/http-exception.filter';
import { InternalServerErrorExceptionFilter } from '@/common-module/filters/internal-server-error-exception.filter';
import { ForbiddenExceptionFilter } from '@/common-module/filters/forbidden-exceptions.filter';
import { AuthenticatedGuard } from '@/common-module/guards/authenticated.guard';
import { IdentityModule } from '@/identity-module/identity.module';
import { WrapResponseWithParentDataFieldInterceptor } from '@/common-module/interceptor/wrap-response-with-parent-data-field-interceptor.service';
import { DomainExceptionFilter } from '@/common-module/filters/domain-exception.filter';
import { SchoolModule } from '@/school-module/school.module';
import HttpMethodsEnum from 'http-methods-enum';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'pass123',
      database: 'postgres',
      autoLoadEntities: true,
      synchronize: true,
    }),
    IdentityModule,
    SchoolModule,
  ],
  providers: [
    {
      provide: APP_FILTER,
      useClass: InternalServerErrorExceptionFilter,
    },
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
    {
      provide: APP_FILTER,
      useClass: DomainExceptionFilter,
    },
    {
      provide: APP_FILTER,
      useClass: ForbiddenExceptionFilter,
    },
    {
      provide: APP_GUARD,
      useClass: AuthenticatedGuard,
    },
    {
      provide: APP_INTERCEPTOR,
      useFactory: args => (
        new WrapResponseWithParentDataFieldInterceptor([
          HttpMethodsEnum.GET,
          HttpMethodsEnum.PUT,
        ])
      )
    },
    {
      provide: APP_PIPE,
      useFactory: () => (
        new ValidationPipe({
          whitelist: true,
          transform: true,
          forbidNonWhitelisted: true,
          transformOptions: {
            enableImplicitConversion: true,
          },
        })
      ),
    },
  ],
})
export class AppModule {}
