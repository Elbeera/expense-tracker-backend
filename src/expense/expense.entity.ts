import { Field, ObjectType, ID } from '@nestjs/graphql';

@ObjectType()
export class Expense {
  @Field(() => ID)
  id: string;

  @Field()
  title: string;

  @Field()
  amount: number;

  @Field()
  category: string;

  @Field()
  createdAt: string;
}
