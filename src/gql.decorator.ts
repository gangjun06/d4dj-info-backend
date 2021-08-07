import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import {
  parseResolveInfo,
  ResolveTree,
  simplifyParsedResolveInfoFragmentWithType,
} from 'graphql-parse-resolve-info';

export const Fields = createParamDecorator(
  (data: unknown, context: ExecutionContext) => {
    const ctx = GqlExecutionContext.create(context);
    const info = ctx.getInfo();
    let parsedInfo = parseResolveInfo(info) as ResolveTree;
    const { fields } = simplifyParsedResolveInfoFragmentWithType(
      parsedInfo,
      info.returnType,
    );
    return fields;
  },
);
