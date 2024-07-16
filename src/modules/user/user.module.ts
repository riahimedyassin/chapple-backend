import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { BcryptService } from '@lib/providers';

@Module({
  controllers: [UserController],
  providers: [UserService, BcryptService],
})
export class UserModule {}
