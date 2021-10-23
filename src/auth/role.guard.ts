import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  HttpCode,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { GqlExecutionContext } from '@nestjs/graphql';
import jwt_decode from 'jwt-decode';
import { User } from './user';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    // const onlyAdmin = this.reflector.getAllAndOverride<boolean>('onlyAdmin', [
    //   context.getHandler(),
    //   context.getClass(),
    // ]);

    // const ctx = GqlExecutionContext.create(context);
    // const user = ctx.getContext().req.user as User;

    // if (onlyAdmin && !user.isAdmin) {
    //   throw new ForbiddenException({
    //     statusCode: HttpStatus.FORBIDDEN,
    //     message: ['FORBIDDEN'],
    //     error: 'Forbidden',
    //   });
    // }
    return true;
  }
}
