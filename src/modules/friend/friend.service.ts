import { Injectable } from '@nestjs/common';
import { CreateFriendDto } from './dto/create-friend.dto';
import { UpdateFriendDto } from './dto/update-friend.dto';
import { PrismaClient } from '@prisma/client';
import { DatabaseService } from '@core/database/database.service';
import { GetFriendDto } from './dto/get-friend.dto';
import { GetFriendRequestDto } from './dto/get-friend-request.dto';

@Injectable()
export class FriendService {
  private readonly friendRepository: PrismaClient['friend'];
  constructor(private readonly databaseService: DatabaseService) {
    this.friendRepository = this.databaseService.friend;
  }
  async create(createFriendDto: CreateFriendDto, sent_by: string) {
    if (await this.areFriends(createFriendDto.sent_to, sent_by)) return;
    return this.friendRepository.create({
      data: {
        sent_by: {
          connect: {
            email: sent_by,
          },
        },
        sent_to: {
          connect: {
            email: createFriendDto.sent_to,
          },
        },
      },
    });
  }

  async findAll(email: string) {
    const friends = await this.friendRepository.findMany({
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
      select: {
        id: true,
        sent_at: true,
        sent_by_email: false,
        sent_to_email: false,
        sent_by: {
          select: {
            username: true,
            email: true,
          },
        },
        sent_to: {
          select: {
            username: true,
            email: true,
          },
        },
      },
    });
    const result = friends.map((friend) => new GetFriendDto(friend, email));
    return result;
  }
  async findAllRequestsNumber(email: string) {
    return this.friendRepository.count({
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

  async findAllRequests(email: string): Promise<GetFriendRequestDto[]> {
    return this.friendRepository.findMany({
      where: {
        AND: [
          { sent_by_email: email },
          {
            accepted: false,
          },
        ],
      },
      select: {
        sent_to_email: false,
        sent_by_email: false,
        sent_at: true,
        id: true,
        sent_to: {
          select: {
            username: true,
            email: true,
          },
        },
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
      include: {
        sent_by: {
          select: {
            username: true,
          },
        },
      },
    });
  }
  findOne(id: number) {
    return `This action returns a #${id} friend`;
  }

  update(id: number, updateFriendDto: UpdateFriendDto) {
    return this.friendRepository.update({
      where: {
        id: id,
      },
      data: {
        ...updateFriendDto,
      },
    });
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
      (
        await this.friendRepository.findMany({
          where: {
            OR: [
              {
                sent_by: {
                  email: emailOne,
                },
                sent_to: {
                  email: emailTwo,
                },
              },
              {
                sent_by: {
                  email: emailTwo,
                },
                sent_to: {
                  email: emailOne,
                },
              },
            ],
          },
        })
      ).length == 1
    );
  }
}
