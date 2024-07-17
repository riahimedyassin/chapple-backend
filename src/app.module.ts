import { Module } from '@nestjs/common';
import { DatabaseModule } from './core/database/database.module';
import { UserModule } from './modules/user/user.module';
import { ChatGatewayModule } from './chat-gateway/chat-gateway.module';
import { MessageModule } from './modules/message/message.module';
import { LoggerModule } from '@core/logger/Logger.module';
import { AuthModule } from '@core/auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { EventEmitter2, EventEmitterModule } from '@nestjs/event-emitter';
import { GroupModule } from './modules/group/group.module';

@Module({
  imports: [
    DatabaseModule,
    UserModule,
    ChatGatewayModule,
    MessageModule,
    LoggerModule,
    AuthModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    EventEmitterModule.forRoot({
      global: true,
    }),
    GroupModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
