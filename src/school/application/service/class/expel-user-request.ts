import { IsNotEmpty, IsString } from 'class-validator';

export class ExpelUserRequest {
  @IsNotEmpty()
  @IsString()
  userHash: string;
}
