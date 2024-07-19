import { Injectable } from '@nestjs/common';
import { CreateGroupMessageDto } from './dto/create-group-message.dto';
import { UpdateGroupMessageDto } from './dto/update-group-message.dto';
import { PrismaClient } from '@prisma/client';
import { DatabaseService } from '@core/database/database.service';

@Injectable()
export class GroupMessageService {
  private readonly groupMessageService: PrismaClient['groupMessage'];
  constructor(private readonly databaseService: DatabaseService) {
    this.groupMessageService = this.databaseService.groupMessage;
  }
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
            id: createGroupMessageDto.group,
          },
        },
      },
    });
  }

  async findAll(group: number) {
    return this.groupMessageService.findMany({
      where: {
        groupId: group,
      },
    });
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
