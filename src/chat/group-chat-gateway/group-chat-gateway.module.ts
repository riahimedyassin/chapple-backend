import { Module } from '@nestjs/common';
import { GroupChatGateway } from './group-chat-gateway';
import { AuthModule } from '@core/auth/auth.module';
import { GroupConnectionService } from './providers';
import { UserGroupService } from '@modules/group/providers/user-group.service';

@Module({
  providers: [GroupConnectionService, GroupChatGateway, UserGroupService],
  imports: [AuthModule],
})
export class GroupChatGatewayModule {}
