// src/auth/dto/login.dto.ts

import { IsString, IsNotEmpty, IsPhoneNumber } from 'class-validator';

export class LoginDto {
  @IsString()
  @IsPhoneNumber()
  phoneNumber: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
