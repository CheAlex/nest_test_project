import { DomainException } from '@/common/domain/exception/domain-exception';

export class ModelNotFoundException extends DomainException {
  /**
   * В проекте вместо 404-го статуса используют 400-й
   */
  constructor(message: string, status: number = 400) {
    super(message, status);
  }

  /**
   * В проекте вместо 404-го статуса используют 400-й
   */
  static fromClassAndId(className: string, id: any, status: number = 400) {
    return new this(`Model ${className}#${id} not found.`, status);
  }
}
