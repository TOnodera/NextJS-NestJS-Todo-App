import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { GqlExecutionContext } from '@nestjs/graphql';
import { Roles } from './roles.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    // SetMetadataのrolesに定義されたロール値を取得する
    const roles = this.reflector.get<number[]>(Roles, context.getHandler());
    // ロール値が取得できなければtrue（つまり、ガードされていない)
    if (!roles) {
      return true;
    }
    // contextからGraphQLのctxを取得する
    const ctx = GqlExecutionContext.create(context);
    return ctx.getContext().req;
  }
}
