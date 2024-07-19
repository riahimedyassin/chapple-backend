import { Module } from '@nestjs/common';
import { GroupService } from './group.service';
import { GroupController } from './group.controller';
import { UserGroupService } from './providers/user-group.service';

@Module({
  controllers: [GroupController],
  providers: [GroupService, UserGroupService],
})
export class GroupModule {}
