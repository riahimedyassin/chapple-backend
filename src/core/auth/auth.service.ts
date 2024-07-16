import { RequestUserInterface } from '@interfaces/RequestUser.interface';
import { BcryptService } from '@lib/providers/bcrypt.service';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import { UserService } from 'src/modules/user/user.service';
import { Socket } from 'socket.io';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly bcryptService: BcryptService,
    private readonly jwtService: JwtService,
  ) {}
  async validateUser(email: string, password: string) {
    const user = await this.userService.findOne(email);
    if (!user) throw new UnauthorizedException();
    if (!this.bcryptService.compare(password, user.password))
      throw new UnauthorizedException();
    return user;
  }
  generateToken(user: User) {
    return this.jwtService.sign({
      email: user.email,
      username: user.username,
    });
  }
  verfiyToken(token: string): RequestUserInterface {
    this.jwtService.verifyAsync(token, { ignoreExpiration: false });
    return this.jwtService.decode(token);
  }
  extractTokenFromSocket(socket: Socket) {
    const headers = socket.handshake.headers;
    if (!headers['authorization']) return null;
    const token = headers.authorization.split(' ')[1];
    const payload = this.verfiyToken(token);
    return payload;
  }
}
