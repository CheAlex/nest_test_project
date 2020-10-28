import { IsInt, IsNotEmpty, IsString, IsUrl, Max, Min } from 'class-validator';

export abstract class OperateContentRequest {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsInt()
  @Min(1)
  @Max(999)
  order: number;

  @IsNotEmpty()
  @IsString()
  @IsUrl()
  uri: string;
}
