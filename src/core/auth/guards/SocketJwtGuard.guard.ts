import {
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { WsException } from '@nestjs/websockets';
import { Socket } from 'net';
import { Observable } from 'rxjs';

export class SocketJwtGuard
  extends AuthGuard('socket-jwt')
  implements CanActivate
{
  getRequest(context: ExecutionContext) {
    return context.switchToWs().getClient().handshake;
  }
  handleRequest(err, user, info, context) {
    if (err || info instanceof Error || !user) {
      throw new UnauthorizedException();
    }
    return user;
  }
  async canActivate(context: ExecutionContext): Promise<boolean> {
    try {
      const result = await super.canActivate(context);
      return result as boolean;
    } catch (error) {
      const client = context.switchToWs().getClient();
      client.emit('error', { message: 'Unauthorized' });
      return false;
    }
  }
}
