import { IsNotEmpty, IsString } from 'class-validator';

export abstract class AddKeynoteRequest {
  @IsNotEmpty()
  @IsString()
  keynoteHash: string;
}
