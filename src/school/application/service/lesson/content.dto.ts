import { ArrayMinSize } from 'class-validator';

export class ContentDto {
  @ArrayMinSize(1)
  videos: string[];

  @ArrayMinSize(1)
  keynotes: string[];
}
