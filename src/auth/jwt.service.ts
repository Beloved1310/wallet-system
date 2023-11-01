import { Injectable } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';

import * as dotenv from 'dotenv';
dotenv.config();

@Injectable()
export class JwtService {
  private static jwtSecret: string = process.env.JWT;

  static generateToken(payload: any): string {
    return jwt.sign(payload, JwtService.jwtSecret);
  }

  static verifyToken(token: string): any {
    try {
      return jwt.verify(token, JwtService.jwtSecret);
    } catch (error) {
      throw new Error('Invalid token');
    }
  }
}
