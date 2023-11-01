// src/user/user.module.ts

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from './user.contoller';
import { UserService } from './user.service';
import { User } from './user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User])], // Import the User entity
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService], // Export the UserService so it can be used in other modules
})
export class UserModule {}
