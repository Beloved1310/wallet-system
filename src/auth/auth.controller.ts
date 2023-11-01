// // src/auth/auth.controller.ts

// import { Controller, Post, Body, Res, UseGuards } from '@nestjs/common';
// import { AuthService } from './auth.service';
// import { LoginDto } from '../user/dto/login.dto';

// @Controller('auth')
// export class AuthController {
//   constructor(private authService: AuthService) {}

//   @Post('login')
//   async login(@Body() loginDto: LoginDto, @Res() res) {
//     try {
//       const result = await this.authService.login(loginDto);
//       return res.status(200).json(result);
//     } catch (error) {
//       return res.status(401).json({ message: 'Authentication failed.' });
//     }
//   }
// }
