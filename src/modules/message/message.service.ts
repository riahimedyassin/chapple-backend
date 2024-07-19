import { Injectable } from '@nestjs/common';
import { createMessageDto } from './dto';
import { DatabaseService } from '@core/database/database.service';
import { PrismaClient } from '@prisma/client';
import { OnEvent } from '@nestjs/event-emitter';
import {
  PAGINCATION_LIMIT,
  PAGINCATION_LIMIT_MESSAGE,
} from '@common/constants';

@Injectable()
export class MessageService {
  private readonly messageRepository: PrismaClient['message'];
  constructor(private readonly databaseService: DatabaseService) {
    this.messageRepository = this.databaseService.message;
  }
  @OnEvent('message.create')
  async create(createMessageDto: createMessageDto) {
    this.messageRepository.create({
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

  async findAll(email: string, page: number) {
    const end = PAGINCATION_LIMIT_MESSAGE * page - 1;
    const start = end - PAGINCATION_LIMIT_MESSAGE;
    return this.messageRepository.findMany({
      skip: start,
      take: PAGINCATION_LIMIT_MESSAGE,
      where: {
        OR: [
          {
            toEmail: email,
          },
          {
            fromEmail: email,
          },
        ],
      },
    });
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
