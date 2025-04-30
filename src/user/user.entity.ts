// src/user/user.entity.ts
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { ObjectType, Field } from '@nestjs/graphql';

@Entity()
@ObjectType()
export class User {
  @PrimaryGeneratedColumn()
  @Field()
  id: number;

  @Column()
  @Field()
  username: string;

  @Column()
  @Field()
  email: string;

  @Column()
  @Field()
  password: string;
}
