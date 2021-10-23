import {
  createParamDecorator,
  ExecutionContext,
  SetMetadata,
  applyDecorators,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

export const CurrentUser = createParamDecorator(
  (data: unknown, context: ExecutionContext) => {
    const ctx = GqlExecutionContext.create(context);
    return ctx.getContext().req.user;
  },
);

export const Auth = (data?: { onlyAdmin?: boolean }) => {
  return applyDecorators(
    SetMetadata('useAuth', true),
    SetMetadata('onlyAdmin', data?.onlyAdmin || false),
  );
};
