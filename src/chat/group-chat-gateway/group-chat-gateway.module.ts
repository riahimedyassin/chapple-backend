import { Module } from '@nestjs/common';
import { GroupChatGateway } from './group-chat-gateway';
import { AuthModule } from '@core/auth/auth.module';
import { GroupConnectionService } from './providers';

@Module({
  providers: [GroupConnectionService , GroupChatGateway],
  imports: [AuthModule],
})
export class GroupChatGatewayModule {}
