import { Injectable } from '@nestjs/common';
import { UserService } from 'src/modules/user/user.service';

export class AuthService {
  constructor(private readonly userService: UserService) {}
  validateUser(phone: string, password: string) {
    const user = this.userService.findOne(phone);
  }
}
