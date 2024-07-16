import { Module } from '@nestjs/common';
import { DatabaseModule } from './core/database/database.module';
import { UserModule } from './modules/user/user.module';
import { GatewayModule } from './gateway/gateway.module';
import { MessageModule } from './modules/message/message.module';
import { BcryptModule } from './lib/Bcrypt/Bcrypt.module';
import { LoggerModule } from '@core/logger/Logger.module';
import { AuthModule } from '@core/auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { EventEmitter2, EventEmitterModule } from '@nestjs/event-emitter';

@Module({
  imports: [
    DatabaseModule,
    UserModule,
    GatewayModule,
    MessageModule,
    BcryptModule,
    LoggerModule,
    AuthModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    EventEmitterModule.forRoot({
      global: true,
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
