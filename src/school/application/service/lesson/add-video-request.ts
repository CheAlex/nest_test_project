import { IsNotEmpty, IsString } from 'class-validator';

export abstract class AddVideoRequest {
  @IsNotEmpty()
  @IsString()
  videoHash: string;
}
