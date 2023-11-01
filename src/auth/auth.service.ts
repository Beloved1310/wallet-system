// // src/auth/auth.service.ts

// import { Injectable } from '@nestjs/common';
// import { JwtService } from '@nestjs/jwt';
// import { UserService } from '../user/user.service';
// import { User } from '../user/user.entity';
// import { LoginDto } from './dto/login.dto';

// @Injectable()
// export class AuthService {
//   constructor(
//     private userService: UserService,
//     private jwtService: JwtService,
//   ) {}

//   async login(loginDto: LoginDto) {
//     const { phoneNumber, password } = loginDto;
//     const user = await this.userService.validateUser(phoneNumber, password);

//     if (!user) {
//       throw new Error('Invalid credentials.');
//     }

//     const payload = { sub: user.id };
//     return {
//       access_token: this.jwtService.sign(payload),
//     };
//   }
// }
