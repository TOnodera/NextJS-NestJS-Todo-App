import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { GqlExecutionContext } from '@nestjs/graphql';
import { Roles } from './roles.decorator';
import { roles, users } from '@prisma/client';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    // SetMetadataのrolesに定義されたロール値を取得する
    const roles = this.reflector.get<string[]>(Roles, context.getHandler());
    // ロール値が取得できなければtrue（つまり、ガードされていない)
    if (!roles) {
      return true;
    }
    // contextからGraphQLのctxを取得する
    const ctx = GqlExecutionContext.create(context);
    const user: (users & { role: roles }) | undefined =
      ctx.getContext().req.user;
    return roles.includes(user?.role.id);
  }
}
