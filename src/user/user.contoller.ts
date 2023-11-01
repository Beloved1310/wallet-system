// src/user/user.controller.ts

import { Controller, Post, Body, Res } from '@nestjs/common';
import { UserService } from './user.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto'; // Create a new DTO for login

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Post('register')
  async register(@Body() registerDto: RegisterDto, @Res() res) {
    try {
      await this.userService.register(registerDto);
      return res.status(201).json({ message: 'User registered successfully.' });
    } catch (error) {
      return res.status(500).json({ message: 'Registration failed.' });
    }
  }

  @Post('login')
  async login(@Body() loginDto: LoginDto, @Res() res) {
    try {
      const token = await this.userService.login(loginDto);
      return res.status(200).json({ message: 'Login Successful', token });
    } catch (error) {
      return res.status(401).json({ message: 'Login failed.' });
    }
  }
}
