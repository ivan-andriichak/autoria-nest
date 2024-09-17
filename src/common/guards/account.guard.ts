import { CanActivate, ExecutionContext, ForbiddenException, Injectable, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AccountType } from '../enums/account-name.enum';
import { ACCOUNT_TYPE_KEY } from '../decorators/account-type.decorator';

@Injectable()
export class AccountGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredAccountTypes = this.reflector.getAllAndOverride<AccountType[]>(ACCOUNT_TYPE_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!requiredAccountTypes) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const user = request.user;

    if (!user) {
      throw new UnauthorizedException();
    }

    const hasAccountType = requiredAccountTypes.includes(user.accountType);
    if (!hasAccountType) {
      throw new ForbiddenException('Access denied: insufficient account type');
    }

    return true;
  }
}
