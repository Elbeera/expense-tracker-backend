// src/auth/dto/signup-response.dto.ts
import { ObjectType, Field } from '@nestjs/graphql';
import { User } from '../../user/user.entity'; // Adjust the import path if necessary

@ObjectType()
export class SignupResponse {
  @Field(() => User)
  user: User;

  @Field()
  token: string;
}
