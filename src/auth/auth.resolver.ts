import {
  BadRequestException,
  ConflictException,
  Inject,
  NotFoundException,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
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
import { string } from 'joi';
import { User, UserWithToken } from './user';
import { CurrentUser, Auth } from './user.decorator';
import { AuthService } from './auth.service';

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
class LoginReqInput {
  @Field({ nullable: false })
  @IsEmail()
  email: string;
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
export class AuthResolver {
  constructor(@Inject(AuthService) private userService: AuthService) {}

  @Query((returns) => User)
  @Auth()
  async me(@CurrentUser() user: User) {
    return user;
  }

  // @Mutation((returns) => UserWithToken)
  // async signUp(@Args('data') data: UserSignUpInput) {
  //   const user = await this.userService.createUser(
  //     data.email,
  //     data.name,
  //     data.password,
  //   );
  //   await this.userService.sendVerifyMail(data.email);
  //   return user;
  // }

  // @Mutation((returns) => Boolean)
  // async emailVerifyReq(@Args('email') email: string) {
  //   const user = this.userService.getUserByEmail(email);
  //   if (!user) throw new NotFoundException('can not find user');
  //   if ((await user).emailVerified)
  //     throw new ConflictException('user is already verified');
  //   await this.userService.sendVerifyMail(email);
  //   return true;
  // }

  // @Mutation((returns) => Boolean)
  // async emailVerify(@Args('data') data: EmailVerifyInput) {
  //   return this.userService.emailVerify(data.email, data.code);
  // }

  // @Mutation((returns) => null)
  // async loginReq(@Args('data') data: LoginReqInput) {
  //   return this.userService.login(data.email);
  // }
}
