import { IsInt, IsNotEmpty, IsString, Max, Min, ValidateNested } from 'class-validator';
import { DurationDto } from '@/school/application/service/class/duration.dto';

export abstract class OperateClassRequest {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsInt()
  @Min(1)
  @Max(9999)
  order: number;

  @IsNotEmpty()
  @ValidateNested()
  duration: DurationDto;
}
