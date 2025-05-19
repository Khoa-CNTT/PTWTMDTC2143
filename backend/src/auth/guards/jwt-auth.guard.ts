import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { isPublicRoute } from '../utils/route-matcher.util';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  // canActivate(context: ExecutionContext) {
  //   return super.canActivate(context);
  // }

  canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const method = request.method.toUpperCase(); // chuẩn hóa method
    const path = request.route?.path || request.url; // fallback nếu không có route.path

    // Nếu route public thì không xác thực
    if (isPublicRoute(path, method)) {
      return true;
    }

    // Ngược lại, chạy xác thực jwt bình thường
    return super.canActivate(context);
  }
}
