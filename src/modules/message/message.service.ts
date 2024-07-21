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
    const end = PAGINCATION_LIMIT_MESSAGE * page;
    const start = end - PAGINCATION_LIMIT_MESSAGE;
    const messages = await this.messageRepository.findMany({
      skip: start,
      take: PAGINCATION_LIMIT_MESSAGE,
      orderBy: {
        sent_at: 'asc',
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
    console.log(messages);
    return messages.map((message) => new GetMessageDto(message, email));
  }

  findOne(id: number) {
    return `This action returns a #${id} message`;
  }

  update(id: number, updateMessageDto) {
    return `This action updates a #${id} message`;
  }

  remove(id: number) {
    return `This action removes a #${id} message`;
  }
}
