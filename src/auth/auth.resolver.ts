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

  // Sign up mutation
  @Mutation(() => SignupResponse)
  async signup(@Args('input') input: SignupInput): Promise<SignupResponse> {
    return this.authService.signup(input);
  }

  // Login mutation
  @Mutation(() => LoginResponse)
  async login(
    @Args('input') input: LoginInput,
    @Context() context: { res: Response }, // Use @Context() with proper typing
  ): Promise<LoginResponse> {
    // Perform the login operation
    const { token } = await this.authService.login(input);

    // Set the token in an HttpOnly cookie for secure transmission
    context.res.cookie('token', token, {
      httpOnly: true, // Ensures JavaScript can't access this cookie
      secure: process.env.NODE_ENV === 'production', // Only secure in production
      sameSite: 'lax', // Same-site protection
      maxAge: 1000 * 60 * 60 * 24, // 1 day expiration for the cookie
    });

    // Return the token in the response
    return { token }; // Return token as an object (GraphQL response format)
  }

  // Query to get the current user (protected)
  @Query(() => User)
  @UseGuards(GqlAuthGuard) // Ensures the user is authenticated
  async me(@CurrentUser() user: User): Promise<User> {
    return this.authService.me(user.id); // Fetch the user information based on the current user
  }
}
