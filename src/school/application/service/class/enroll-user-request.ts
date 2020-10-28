import { IsNotEmpty, IsString } from 'class-validator';

export class EnrollUserRequest {
  @IsNotEmpty()
  @IsString()
  userHash: string;
}
