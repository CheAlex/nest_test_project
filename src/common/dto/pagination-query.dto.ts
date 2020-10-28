import { IsInt, IsOptional, IsPositive } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class PaginationQueryDto {
  @ApiProperty({
    description: 'Ограничивате количество элементов в выборке',
    default: 10,
    example: 15,
    type: 'integer'
  })
  @IsOptional()
  @IsPositive()
  @IsInt()
  limit: number = 10;

  @ApiProperty({
    name: 'page',
    description: 'Указывает на страницу',
    type: 'integer',
    example: 1,
    default: 1
  })
  @IsOptional()
  @IsPositive()
  @IsInt()
  page: number = 1;
}
