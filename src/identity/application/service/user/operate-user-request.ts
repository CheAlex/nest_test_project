import { IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Role } from '@/identity/domain/model/user/role';
import { Sex } from '@/identity/domain/model/user/sex';

export abstract class OperateUserRequest {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  phone: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  @IsNotEmpty()
  @IsEnum(Sex)
  sex: Sex;

  @IsOptional()
  @IsEnum(Role)
  role: Role;
}
