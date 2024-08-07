import { Injectable } from '@nestjs/common';
import { CreateGroupDto } from './dto/create-group.dto';
import { UpdateGroupDto } from './dto/update-group.dto';
import { DatabaseService } from '@core/database/database.service';
import { PrismaClient, user_group } from '@prisma/client';
import { UserGroupService } from './providers/user-group.service';

@Injectable()
export class GroupService {
  private readonly groupRepository: PrismaClient['group'];
  constructor(
    private readonly databaseService: DatabaseService,
    private readonly userGroupService: UserGroupService,
  ) {
    this.groupRepository = this.databaseService.group;
  }

  async create(createGroupDto: CreateGroupDto, owner: string) {
    const group = await this.groupRepository.create({
      data: {
        name: createGroupDto.name,
        owner: {
          connect: {
            email: owner,
          },
        },
      },
    });
    await this.addUsers(group.id, owner);
    if (createGroupDto.users) this.addUsers(group.id, createGroupDto.users);
    return group;
  }

  addUsers(group: number, email: string[]): Promise<boolean>;
  addUsers(group: number, email: string): Promise<boolean>;
  async addUsers(group: number, email: string | string[]) {
    if (Array.isArray(email))
      email.map(
        async (mail) => await this.userGroupService.create(group, mail),
      );
    else await this.userGroupService.create(group, email);
    return true;
  }

  async findAll(email: string) {
    return this.groupRepository.findMany({
      where: {
        OR: [
          {
            ownerEmail: email,
          },
          {
            user_group: {
              some: {
                userEmail: email,
              },
            },
          },
        ],
      },
    });
  }

  async findOne(id: number, email: string) {
    return await this.groupRepository.findFirst({
      where: {
        id,
        OR: [
          { ownerEmail: email },
          { user_group: { some: { userEmail: email } } },
        ],
      },
      include: {
        user_group: true,
      },
    });
  }

  update(id: number, updateGroupDto: UpdateGroupDto) {
    return `This action updates a #${id} group`;
  }

  remove(id: number) {
    return `This action removes a #${id} group`;
  }
  async findGroupUsers(group: number, email: string) {
    return this.groupRepository.findMany({
      where: {
        id: group,
        OR: [
          {
            ownerEmail: email,
          },
          {
            user_group: {
              some: {
                userEmail: email,
              },
            },
          },
        ],
      },
      select: {
        user_group: {
          select: {
            user: {
              select: {
                username: true,
                email: true,
              },
            },
          },
        },
      },
    });
  }
}
