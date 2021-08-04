import 'reflect-metadata';
import { Field, Int, ObjectType, registerEnumType } from '@nestjs/graphql';
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
  emailVerified: Boolean;

  @Field((type) => Boolean, { defaultValue: false })
  isAdmin: Boolean;

  @Field((type) => Date)
  createdAt: Date;
}
