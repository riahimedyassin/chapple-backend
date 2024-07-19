import { Injectable } from '@nestjs/common';
import { CreateFriendDto } from './dto/create-friend.dto';
import { UpdateFriendDto } from './dto/update-friend.dto';
import { PrismaClient } from '@prisma/client';
import { DatabaseService } from '@core/database/database.service';

@Injectable()
export class FriendService {
  private readonly friendRepository: PrismaClient['friend'];
  constructor(private readonly databaseService: DatabaseService) {
    this.friendRepository = this.databaseService.friend;
  }
  async create(createFriendDto: CreateFriendDto, sent_by: string) {
    return this.friendRepository.create({
      data: {
        sent_by_email: sent_by,
        sent_to_email: createFriendDto.sent_to,
      },
    });
  }

  findAll(email: string) {
    return this.friendRepository.findMany({
      where: {
        AND: [
          {
            OR: [{ sent_by_email: email }, { sent_to_email: email }],
          },
          {
            accepted: true,
          },
        ],
      },
    });
  }
  findAllRequests(email: string) {
    return this.friendRepository.findMany({
      where: {
        AND: [
          { sent_by_email: email },
          {
            accepted: false,
          },
        ],
      },
    });
  }
  findAllInvitations(email: string) {
    return this.friendRepository.findMany({
      where: {
        AND: [
          { sent_to_email: email },
          {
            accepted: false,
          },
        ],
      },
    });
  }
  findOne(id: number) {
    return `This action returns a #${id} friend`;
  }

  update(id: number, updateFriendDto: UpdateFriendDto) {
    return `This action updates a #${id} friend`;
  }

  async remove(id: number) {
    return this.friendRepository.delete({
      where: {
        id: id,
      },
    });
  }
  async areFriends(emailOne: string, emailTwo: string) {
    return (
      (await this.friendRepository.findFirst({
        where: {
          OR: [
            { sent_by_email: emailOne, sent_to_email: emailTwo },
            { sent_by_email: emailTwo, sent_to_email: emailOne },
          ],
        },
      })) != null
    );
  }
}
