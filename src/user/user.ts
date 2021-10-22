import 'reflect-metadata';
import { Field, Int, ObjectType } from '@nestjs/graphql';
import { IsEmail, MaxLength, MinLength } from 'class-validator';

@ObjectType()
export class User {
  @Field(() => Int)
  id: number;

  @Field()
  @MinLength(2)
  @MaxLength(20)
  name: string;

  @Field()
  @IsEmail()
  email: string;

  @Field((type) => Boolean, { defaultValue: false })
  emailVerified: boolean;

  @Field((type) => Boolean, { defaultValue: false })
  isAdmin: boolean;

  @Field((type) => Date)
  createdAt: Date;
}

@ObjectType()
export class UserWithToken {
  @Field()
  user: User;
  @Field()
  token: string;
}
