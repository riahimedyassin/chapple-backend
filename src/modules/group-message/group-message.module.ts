import { Module } from '@nestjs/common';
import { GroupMessageService } from './group-message.service';
import { GroupMessageController } from './group-message.controller';
import { GroupService } from '@modules/group/group.service';
import { UserGroupService } from '@modules/group/providers/user-group.service';

@Module({
  controllers: [GroupMessageController],
  providers: [GroupMessageService, GroupService, UserGroupService],
})
export class GroupMessageModule {}
