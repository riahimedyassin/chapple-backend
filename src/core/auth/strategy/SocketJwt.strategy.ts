import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { WsException } from '@nestjs/websockets';
import { Request } from 'express';
import { Strategy } from 'passport-jwt';

@Injectable()
export class SocketJwtStrategy extends PassportStrategy(
  Strategy,
  'socket-jwt',
) {
  constructor(@Inject(ConfigService) private configService: ConfigService) {
    super({
      jwtFromRequest: (req) => {
        if (req.headers && req.headers['socket.io']) {
          try {
            const socketIoData = JSON.parse(req.headers['socket.io']);
            return socketIoData.auth?.token;
          } catch (error) {
            console.error('Error parsing socket.io header:', error);
          }
        }
        return null;
      },
      ignoreExpiration: false,
      secretOrKey: configService.getOrThrow('SECRET_JWT'),
    });
  }
  async validate(payload: any) {
    if (!payload) {
      throw new WsException('Invalid token');
    }
    return { userId: payload.sub, username: payload.username };
  }
}
