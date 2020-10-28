import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class WrapResponseWithParentDataFieldInterceptor implements NestInterceptor {
  private readonly methods: Set<string>;

  constructor(methods: string[]) {
    this.methods = new Set(methods);
  }

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const method = context.switchToHttp().getRequest().method;

    if (this.methods.has(method)) {
      return next.handle().pipe(map((data) => ({ data })));
    }

    return next.handle();
  }
}
