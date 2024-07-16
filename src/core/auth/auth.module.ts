import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserService } from 'src/modules/user/user.service';
import { UserStrategy } from './strategy/User.strategy';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { JwtStrategy } from './strategy/Jwt.strategy';
import { SocketJwtStrategy } from './strategy/SocketJwt.strategy';
import { BcryptService } from '@lib/providers';

@Module({
  imports: [
    JwtModule.registerAsync({
      useFactory: (configService: ConfigService) => ({
        secret: configService.getOrThrow('SECRET_JWT'),
        signOptions: {
          expiresIn: '1h',
        },
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [
    AuthService,
    UserStrategy,
    UserService,
    JwtStrategy,
    SocketJwtStrategy,
    BcryptService
  ],
  exports: [JwtStrategy, JwtModule, AuthService],
})
export class AuthModule {}
