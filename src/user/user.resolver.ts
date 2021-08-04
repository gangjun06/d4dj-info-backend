import { Inject, UnauthorizedException, UseGuards } from '@nestjs/common';
import {
  Args,
  Mutation,
  ResolveField,
  Resolver,
  Query,
  InputType,
  Field,
  ArgsType,
} from '@nestjs/graphql';
import { IsEmail, Length, MaxLength, MinLength } from 'class-validator';
import { AuthGuard } from './auth.guard';
import { User } from './user';
import { CurrentUser } from './user.decorator';
import { UserService } from './user.service';

@InputType()
class UserSignUpInput {
  @Field({ nullable: false })
  @IsEmail()
  email: string;

  @Field({ nullable: false })
  @MinLength(2)
  @MaxLength(20)
  name: string;

  @Field({ nullable: false })
  @MinLength(6)
  @MaxLength(32)
  password: string;
}

@InputType()
class SignInInput {
  @Field({ nullable: false })
  @IsEmail()
  email: string;

  @Field({ nullable: false })
  @MinLength(6)
  @MaxLength(32)
  password: string;
}
@InputType()
class EmailVerifyInput {
  @Field({ nullable: false })
  @IsEmail()
  email: string;

  @Field({ nullable: false })
  @Length(6)
  code: string;
}

@Resolver(User)
export class UserResolver {
  constructor(@Inject(UserService) private userService: UserService) {}

  @Query((returns) => User)
  @UseGuards(new AuthGuard())
  async me(@CurrentUser() user: User) {
    return user;
  }

  @Mutation((returns) => User)
  async signUp(@Args('data') data: UserSignUpInput) {
    const user = await this.userService.createUser(
      data.email,
      data.name,
      data.password,
    );
    await this.userService.sendVerifyMail(data.email);
    return user;
  }

  @Mutation((returns) => String)
  async emailVerify(@Args('data') data: EmailVerifyInput) {
    return this.userService.emailVerify(data.email, data.code);
  }

  @Mutation((returns) => String)
  async login(@Args('data') data: SignInInput) {
    return this.userService.login(data.email, data.password);
  }
}
