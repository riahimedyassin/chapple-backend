import { ForbiddenException, Injectable } from '@nestjs/common';
import { CreateGroupMessageDto } from './dto/create-group-message.dto';
import { UpdateGroupMessageDto } from './dto/update-group-message.dto';
import { PrismaClient } from '@prisma/client';
import { DatabaseService } from '@core/database/database.service';
import { GroupService } from '@modules/group/group.service';
import { OnEvent } from '@nestjs/event-emitter';
import { GetMessageDto } from '@modules/message/dto';

@Injectable()
export class GroupMessageService {
  private readonly groupMessageService: PrismaClient['groupMessage'];
  constructor(
    private readonly databaseService: DatabaseService,
    private readonly groupService: GroupService,
  ) {
    this.groupMessageService = this.databaseService.groupMessage;
  }

  @OnEvent('group.message')
  async create(createGroupMessageDto: CreateGroupMessageDto) {
    return this.groupMessageService.create({
      data: {
        from: {
          connect: {
            email: createGroupMessageDto.sent_by,
          },
        },
        content: createGroupMessageDto.content,
        group: {
          connect: {
            id: +createGroupMessageDto.group,
          },
        },
      },
    });
  }

  async findAll(group: number, email: string) {
    const isMember = await this.groupService.findOne(group, email);
    if (!isMember) throw new ForbiddenException();
    return (
      await this.groupMessageService.findMany({
        where: {
          groupId: group,
        },
      })
    ).map((message) => new GetMessageDto(message, email));
  }

  // findOne(id: number) {
  //   return `This action returns a #${id} groupMessage`;
  // }

  // update(id: number, updateGroupMessageDto: UpdateGroupMessageDto) {
  //   return `This action updates a #${id} groupMessage`;
  // }

  remove(id: number) {
    return `This action removes a #${id} groupMessage`;
  }
}
