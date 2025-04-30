// src/auth/jwt.strategy.ts

import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../../user/user.service'; // Import your user service to find users by JWT

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private jwtService: JwtService,
    private userService: UserService, // Inject the user service to find users
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET || 'defaultSecret', // Fallback to default secret if env variable is missing
    });
  }

  async validate(payload: any) {
    // You can add custom logic here to retrieve the user based on the payload (which contains the userId)
    const user = await this.userService.findById(payload.userId); // Assuming userService has a method to find users
    return user; // Attach the user to the request (or context)
  }
}
