import { IsNotEmpty, IsString } from 'class-validator';

export class AddLessonRequest {
  @IsNotEmpty()
  @IsString()
  lessonHash: string;
}
