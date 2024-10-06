import { IsString, IsNotEmpty } from 'class-validator';

export class LoginReguserDto {
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}