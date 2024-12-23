import { Injectable } from '@nestjs/common';
import { createMessageDto, GetMessageDto } from './dto';
import { DatabaseService } from '@core/database/database.service';
import { PrismaClient } from '@prisma/client';
import { OnEvent } from '@nestjs/event-emitter';
import {
  PAGINCATION_LIMIT,
  PAGINCATION_LIMIT_MESSAGE,
} from '@common/constants';
import { FriendService } from '@modules/friend/friend.service';
import { groupByDate } from '@common/utils';

@Injectable()
export class MessageService {
  private readonly messageRepository: PrismaClient['message'];
  constructor(
    private readonly databaseService: DatabaseService,
    private readonly friendService: FriendService,
  ) {
    this.messageRepository = this.databaseService.message;
  }
  @OnEvent('message.create')
  async create(createMessageDto: createMessageDto) {
    if (
      !(await this.friendService.areFriends(
        createMessageDto.fromEmail,
        createMessageDto.toEmail,
      ))
    )
      this.friendService.create(
        { sent_to: createMessageDto.toEmail },
        createMessageDto.fromEmail,
      );
    await this.messageRepository.create({
      data: {
        content: createMessageDto.content,
        from: {
          connect: {
            email: createMessageDto.fromEmail,
          },
        },
        to: {
          connect: {
            email: createMessageDto.toEmail,
          },
        },
      },
    });
  }

  async findAll(email: string, page: number, username: string) {
    const messages = await this.messageRepository.findMany({
      take: PAGINCATION_LIMIT_MESSAGE * page,
      orderBy: {
        sent_at: 'desc',
      },
      where: {
        OR: [
          {
            toEmail: email,
            from: {
              username,
            },
          },
          {
            fromEmail: email,
            to: {
              username: username,
            },
          },
        ],
      },
    });
    const result = messages
      .reverse()
      .map((message) => new GetMessageDto(message, email));
    return groupByDate(result);
  }

  findOne(id: number) {
    return `This action returns a #${id} message`;
  }

  update(id: number, updateMessageDto) {
    return `This action updates a #${id} message`;
  }

  async remove(id: number) {
    return this.messageRepository.delete({
      where: {
        id,
      },
    });
  }
}
