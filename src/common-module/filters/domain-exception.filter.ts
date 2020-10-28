import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { Response } from 'express';
import { DomainException } from '@/common/domain/exception/domain-exception';

@Catch(DomainException)
export class DomainExceptionFilter<T extends DomainException> implements ExceptionFilter {
  catch(exception: DomainException, host: ArgumentsHost) {
    const context  = host.switchToHttp();
    const response = context.getResponse<Response>();

    response
      .status(exception.getStatus())
      .json({
        error: "Bad Request",
        message: [exception.message]
      })
    ;
  }
}
