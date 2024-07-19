import { Module } from '@nestjs/common';
import { GroupMessageService } from './group-message.service';
import { GroupMessageController } from './group-message.controller';

@Module({
  controllers: [GroupMessageController],
  providers: [GroupMessageService],
})
export class GroupMessageModule {}
