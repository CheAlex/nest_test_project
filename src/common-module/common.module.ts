import { Module } from '@nestjs/common';
import { PaginationUtil } from '@/common/dal/pagination-util';

@Module({
  providers: [
    PaginationUtil,
  ],
  exports: [
    PaginationUtil,
  ]
})
export class CommonModule {}
