import { CanActivate, ExecutionContext } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { WsException } from '@nestjs/websockets';
import { Observable } from 'rxjs';

export class SocketJwtGuard
  extends AuthGuard('socket-jwt')
  implements CanActivate
{
  getRequest(context: ExecutionContext) {
    return context.switchToWs().getClient().handshake;
  }
  handleRequest(err, user, info, context) {
    if (err || !user) {
      const client = context.switchToWs().getClient();
      client.emit('error', { message: 'Unauthorized' });
      return false;
    }
    return user;
  }
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    return super.canActivate(context);
  }
}
