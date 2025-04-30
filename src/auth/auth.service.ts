import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { User } from '../user/user.entity';
import { SignupInput } from './dto/signup.input';
import { LoginInput } from './dto/login.input';
import { SignupResponse } from './dto/signup-response';
import { LoginResponse } from './dto/login-response';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async signup(input: SignupInput): Promise<SignupResponse> {
    const hashedPassword = await bcrypt.hash(input.password, 10);

    const user = this.userRepository.create({
      username: input.username,
      email: input.email,
      password: hashedPassword,
    });

    await this.userRepository.save(user);

    const token = this.jwtService.sign({
      userId: user.id,
      email: user.email,
      name: user.username,
    });

    return { user, token };
  }

  async login(input: LoginInput): Promise<LoginResponse> {
    const user = await this.userRepository.findOne({
      where: { email: input.email },
    });

    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    const isPasswordValid = await bcrypt.compare(input.password, user.password);
    if (!isPasswordValid) {
      throw new Error('Invalid credentials');
    }

    const token = this.jwtService.sign({
      userId: user.id,
      email: user.email,
      name: user.username,
    });

    return { token };
  }

  async me(userId: number): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { id: userId },
    });

    if (!user) {
      throw new Error('User not found');
    }

    return user;
  }
}
