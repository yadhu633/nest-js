import { Injectable, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  canActivate(context: ExecutionContext) {
    // Add some logging to ensure guard is being triggered
    console.log('JwtAuthGuard: Checking token');
    return super.canActivate(context);
  }

  handleRequest(err, user, info) {
    if (err || !user) {
      console.log('JwtAuthGuard: Invalid token or user not found');
      throw err || new UnauthorizedException();
    }
    return user;
  }
}
