// auth.module.ts
import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secretOrPrivateKey: 'your-secret-key',
      signOptions: {
        expiresIn: 3600, // Set the expiration time
      },
    }),
  ],
})
export class JwtAuthGuard {}
