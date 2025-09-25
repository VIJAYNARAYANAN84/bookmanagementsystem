// src/auth/get-user.decorator.ts

import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Author } from './author.entity';

export const GetUser = createParamDecorator(
  (data, ctx: ExecutionContext): Author => {
    const req = ctx.switchToHttp().getRequest();
    return req.user;
  },
);