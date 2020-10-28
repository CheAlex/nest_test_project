import { ArgumentsHost, Catch, ExceptionFilter, HttpStatus } from '@nestjs/common';
import { Response } from 'express';

@Catch(Error)
export class InternalServerErrorExceptionFilter<T extends Error> implements ExceptionFilter {
  catch(exception: T, host: ArgumentsHost) {
    // console.log(exception);

    const context  = host.switchToHttp();
    const response = context.getResponse<Response>();

    response
      .status(HttpStatus.INTERNAL_SERVER_ERROR)
      .json({ message: exception.message })
    ;
  }
}
