// src/user/dto/register.dto.ts

import { IsString, IsNotEmpty, IsPhoneNumber } from 'class-validator';

export class RegisterDto {
  @IsString()
  @IsPhoneNumber()
  phoneNumber: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
