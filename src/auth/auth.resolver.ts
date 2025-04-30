import { Args, Mutation, Query, Resolver, Context } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignupInput } from './dto/signup.input';
import { LoginInput } from './dto/login.input';
import { SignupResponse } from './dto/signup-response';
import { LoginResponse } from './dto/login-response';
import { Response } from 'express';
import { GqlAuthGuard } from '../common/guards/gql-auth.guard';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import { User } from '../user/user.entity';

@Resolver()
export class AuthResolver {
  constructor(private authService: AuthService) {}

  @Mutation(() => SignupResponse)
  async signup(@Args('input') input: SignupInput): Promise<SignupResponse> {
    return this.authService.signup(input);
  }

  @Mutation(() => LoginResponse)
  async login(
    @Args('input') input: LoginInput,
    @Context() context: { res: Response },
  ): Promise<LoginResponse> {
    const { token } = await this.authService.login(input);

    context.res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 1000 * 60 * 60 * 24,
    });

    return { token };
  }

  @Query(() => User)
  @UseGuards(GqlAuthGuard)
  async me(@CurrentUser() user: User): Promise<User> {
    return this.authService.me(user.id);
  }
}
