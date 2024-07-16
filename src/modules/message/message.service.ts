import { Injectable } from '@nestjs/common';
import { createMessageDto } from './dto';
import { DatabaseService } from '@core/database/database.service';
import { PrismaClient } from '@prisma/client';
import { OnEvent } from '@nestjs/event-emitter';

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

  findAll() {
    return this.messageRepository.findMany({});
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
