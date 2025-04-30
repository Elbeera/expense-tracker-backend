// src/user/user.entity.ts
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { ObjectType, Field } from '@nestjs/graphql';

@Entity()
@ObjectType() // This decorator makes it a GraphQL type
export class User {
  @PrimaryGeneratedColumn()
  @Field() // This decorator marks the field for GraphQL exposure
  id: number;

  @Column()
  @Field() // This decorator marks the field for GraphQL exposure
  username: string;

  @Column()
  @Field() // This decorator marks the field for GraphQL exposure
  email: string;

  @Column()
  @Field() // This decorator marks the field for GraphQL exposure
  password: string;
}
