import { Injectable } from '@nestjs/common';
import { PaginationQueryDto } from '@/common/dto/pagination-query.dto';

@Injectable()
export class PaginationUtil {
  calculateLimitAndOffset(paginationQueryDto: PaginationQueryDto) {
    return {
      limit:  paginationQueryDto.limit,
      offset: (paginationQueryDto.page - 1) * paginationQueryDto.limit,
    };
  }
}
