import {
  CanActivate,
  ExecutionContext,
  Injectable,
  ForbiddenException,
} from '@nestjs/common';
import { matchRoutePath, isPublicRoute } from '../utils/route-matcher.util';
import { RoleEnum } from '@prisma/client';

@Injectable()
export class GlobalRoleGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const method = request.method;
    const user = request.user;
    const path = request.route.path;

    if (isPublicRoute(path, method)) {
      return true;
    }

    if (!user || !user.roles || !Array.isArray(user.roles)) {
      throw new ForbiddenException('User not authenticated');
    }
    const allowedRoles = matchRoutePath(path, method);

    if (!allowedRoles) {
      return true;
    }

    const hasRole = user.roles.some((role: string) =>
      allowedRoles.includes(role as RoleEnum)
    );

    if (!hasRole) {
      throw new ForbiddenException('Access denied: insufficient role');
    }

    return true;
  }
}
