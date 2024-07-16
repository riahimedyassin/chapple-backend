import { RequestUserInterface } from '@interfaces/RequestUser.interface';
import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { WsException } from '@nestjs/websockets';
import { Request } from 'express';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class SocketJwtStrategy extends PassportStrategy(
  Strategy,
  'socket-jwt',
) {
  constructor(configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.getOrThrow('SECRET_JWT'),
    });
  }
  async validate(payload: RequestUserInterface) {
    return payload;
  }
}
