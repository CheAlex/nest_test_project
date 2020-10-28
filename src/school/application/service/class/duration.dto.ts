import { IsDate, IsNotEmpty } from 'class-validator';

export class DurationDto {
  @IsNotEmpty()
  @IsDate()
  started: Date;

  @IsNotEmpty()
  @IsDate()
  closed: Date;
}
