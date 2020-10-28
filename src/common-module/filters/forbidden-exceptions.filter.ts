import { ArgumentsHost, Catch, ExceptionFilter, ForbiddenException, HttpException, HttpStatus } from '@nestjs/common';
import { Response } from 'express';

/**
 * Заменяет 403-й статус на 401-й
 */
@Catch(ForbiddenException)
export class ForbiddenExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const context  = host.switchToHttp();
    const response = context.getResponse<Response>();

    response
      .status(HttpStatus.UNAUTHORIZED)
      .json({message: "not authenticated"})
    ;
  }
}
