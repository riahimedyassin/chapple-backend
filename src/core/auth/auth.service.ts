import { BcryptService } from '@common/modules/Bcrypt/Bcrypt.service';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import { UserService } from 'src/modules/user/user.service';

export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly bcryptService: BcryptService,
    private readonly jwtService: JwtService,
  ) {}
  async validateUser(phone: string, password: string) {
    const user = await this.userService.findOne(phone);
    if (!user) throw new UnauthorizedException();
    if (!this.bcryptService.compare(password, user.password))
      throw new UnauthorizedException();
    return user;
  }
  generateToken(user: User) {
    return this.jwtService.sign({
      phone: user.phone,
      username: user.username,
    });
  }
}
