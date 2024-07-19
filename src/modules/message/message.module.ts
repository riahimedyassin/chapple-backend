import { Module } from '@nestjs/common';
import { MessageService } from './message.service';
import { MessageController } from './message.controller';
import { FriendService } from '@modules/friend/friend.service';

@Module({
  controllers: [MessageController],
  providers: [MessageService, FriendService],
})
export class MessageModule {}
