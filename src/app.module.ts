import { Module } from '@nestjs/common';
import { DatabaseModule } from './core/database/database.module';
import { UserModule } from './modules/user/user.module';
import { ChatGatewayModule } from './chat/chat-gateway/chat-gateway.module';
import { MessageModule } from './modules/message/message.module';
import { LoggerModule } from '@core/logger/Logger.module';
import { AuthModule } from '@core/auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { GroupModule } from './modules/group/group.module';
import { GroupChatGatewayModule } from './chat/group-chat-gateway/group-chat-gateway.module';
import { FriendModule } from './modules/friend/friend.module';

@Module({
  imports: [
    DatabaseModule,
    UserModule,
    ChatGatewayModule,
    MessageModule,
    LoggerModule,
    AuthModule,
    GroupChatGatewayModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    EventEmitterModule.forRoot({
      global: true,
    }),
    GroupModule,
    FriendModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
