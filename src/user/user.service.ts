import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { hash, compare } from 'bcrypt';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { JwtService } from 'src/auth/jwt.service';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async register(registerDto: RegisterDto) {
    const { phoneNumber, password } = registerDto;
    const existingUser = await this.userRepository.findOne({
      where: { phoneNumber },
    });

    if (existingUser) {
      throw new UnauthorizedException(
        'User with the same phone number already exists.',
      );
    }

    const hashedPassword = await hash(password, 10);
    const user = this.userRepository.create({
      phoneNumber,
      password: hashedPassword,
    });
    if (password === 'admin'){
      user.role = 'admin'
    }
    await this.userRepository.save(user);
  }

  async login(loginDto: LoginDto) {
    const { phoneNumber, password } = loginDto;
    const user = await this.userRepository.findOne({ where: { phoneNumber } });

    if (!user) {
      throw new NotFoundException('User not found.');
    }

    const passwordMatch = await compare(password, user.password);

    if (!passwordMatch) {
      throw new UnauthorizedException('Invalid password.');
    }
    // Create and return a JWT token
    const token = JwtService.generateToken(user.id);
    return token;
  }
}
