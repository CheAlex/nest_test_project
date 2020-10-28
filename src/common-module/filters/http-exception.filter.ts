import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from '@nestjs/common';
import { Response } from 'express';

interface ExceptionResponse {
  error?:      string;
  message?:    string | string[];
  statusCode?: string;
}

@Catch(HttpException)
export class HttpExceptionFilter<T extends HttpException> implements ExceptionFilter {
  catch(exception: T, host: ArgumentsHost) {
    const context           = host.switchToHttp();
    const response          = context.getResponse<Response>();
    const status            = exception.getStatus();
    const exceptionResponse = exception.getResponse();

    const error =
      typeof response === 'string'
      ? { message: [exceptionResponse] }
      : (
          ({ error, message, }) => ({ error, message: typeof message === 'string' ? [message] : message })
        )(exceptionResponse as ExceptionResponse)
    ;

    response.status(status).json(error);
  }
}
