import { Injectable } from '@nestjs/common';
import { Prisma, PrismaClient } from '@prisma/client';
import { BcryptService } from '@common/modules/Bcrypt/Bcrypt.service';
import { DatabaseService } from '@core/database/database.service';
import { UpdateUserDto } from './dto';

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

  async findAll() {
    return this.userRepository.findMany({});
  }

  findOne(phone: string) {
    return this.userRepository.findUnique({
      where: { phone },
    });
  }

  async update(phone: string, updateUserDto: UpdateUserDto) {
    return this.userRepository.update({
      where: {
        phone,
      },
      data: updateUserDto,
    });
  }

  remove(phone: string) {
    return this.userRepository.delete({
      where: {
        phone,
      },
    });
  }
}
