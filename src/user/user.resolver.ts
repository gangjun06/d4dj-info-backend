import { Inject, UseGuards } from '@nestjs/common';
import {
  Args,
  Mutation,
  ResolveField,
  Resolver,
  Query,
  InputType,
  Field,
} from '@nestjs/graphql';
import { AuthGuard } from './auth.guard';
import { User } from './user';
import { UserService } from './user.service';

@InputType()
class UserSignUpInput {
  @Field({ nullable: true })
  email: string;

  @Field({ nullable: true })
  name: string;
}

@Resolver(User)
export class UserResolver {
  constructor(@Inject(UserService) private userService: UserService) {}

  @Query()
  @UseGuards(new AuthGuard())
  async me() {}

  @Mutation((returns) => User)
  async signUp(@Args('data') data: UserSignUpInput) {}

  @Mutation()
  async emailVerify(@Args('email') email: string) {}

  @Mutation()
  async login(@Args('email') email: string) {}
}
