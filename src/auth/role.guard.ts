import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  HttpCode,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Reflector } from '@nestjs/core';
import { GqlExecutionContext } from '@nestjs/graphql';
import jwt_decode from 'jwt-decode';
import { User } from './user';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private readonly configService: ConfigService,
  ) {}

  canActivate(context: ExecutionContext): boolean {
    const onlyAdmin = this.reflector.getAllAndOverride<boolean>('onlyAdmin', [
      context.getHandler(),
      context.getClass(),
    ]);

    if (onlyAdmin) {
      try {
        const header = (
          context.getArgs().find((item) => item && item.authScope !== undefined)
            .authScope as string
        ).replace('Basic ', '');

        if (this.configService.get<string>('basicAuth') !== header)
          throw new Error();
      } catch (e) {
        throw new ForbiddenException({
          statusCode: HttpStatus.FORBIDDEN,
          message: ['FORBIDDEN'],
          error: 'Forbidden',
        });
      }
    }
    return true;
  }
}
