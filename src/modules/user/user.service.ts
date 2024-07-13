import { Injectable } from '@nestjs/common';
import { Prisma, PrismaClient } from '@prisma/client';
import { BcryptService } from '@common/modules/Bcrypt/Bcrypt.service';
import { DatabaseService } from '@core/database/database.service';

@Injectable()
export class UserService {
  private readonly userRepository: PrismaClient['user'];
  constructor(
    private readonly databaseService: DatabaseService,
    private readonly bcryptService: BcryptService,
  ) {
    this.userRepository = this.databaseService.user;
  }

  async create(createUserDto: Prisma.UserCreateInput) {
    createUserDto.password = await this.bcryptService.encrypt(
      createUserDto.password,
    );
    return this.databaseService.user.create({
      data: createUserDto,
    });
  }

  findAll() {}

  findOne(phone: number) {
    return this.userRepository.findUnique({
      where: { phone },
    });
  }

  update(id: number, updateUserDto: Prisma.UserUpdateInput) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
