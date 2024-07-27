import { DatabaseService } from '@core/database/database.service';
import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class UserGroupService {
  private readonly userGroupRepository: PrismaClient['user_group'];
  constructor(private readonly databaseService: DatabaseService) {
    this.userGroupRepository = this.databaseService.user_group;
  }
  async isMember(group: number, email: string) {
    return await this.userGroupRepository.findFirst({
      where: {
        groupId: +group,
        userEmail: email,
      },
    });
  }
  create(group: number, email: string) {
    return this.userGroupRepository.create({
      data: {
        group: { connect: { id: group } },
        user: { connect: { email: email } },
      },
    });
  }
}
