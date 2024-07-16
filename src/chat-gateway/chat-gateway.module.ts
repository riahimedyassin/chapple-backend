import { Module, OnModuleInit } from '@nestjs/common';
import { ChatGateway } from './chat-gateway';
import { AuthModule } from '@core/auth/auth.module';
import { UserConnectionService } from './providers/UserConnection.service';

@Module({
  providers: [ChatGateway, UserConnectionService],
  imports: [AuthModule],
})
export class ChatGatewayModule {}
