import {
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { WsException } from '@nestjs/websockets';
import { Socket } from 'net';
import { Observable } from 'rxjs';
import { AuthService } from '../auth.service';

export class SocketJwtGuard
  extends AuthGuard('socket-jwt')
  implements CanActivate
{
  getRequest(context: ExecutionContext) {
    return context.switchToWs().getClient().handshake;
  }
  handleRequest(err, user, info) {
    if (err || info instanceof Error || !user) throw new WsException('Unauth');
    return user;
  }
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const result = await super.canActivate(context);
    return result as boolean;
  }
}
