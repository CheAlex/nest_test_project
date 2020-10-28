import { IsInt, IsNotEmpty, IsString, Max, Min, ValidateNested } from 'class-validator';
import { ContentDto } from '@/school/application/service/lesson/content.dto';

export abstract class OperateLessonRequest {
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
  content: ContentDto;
}
