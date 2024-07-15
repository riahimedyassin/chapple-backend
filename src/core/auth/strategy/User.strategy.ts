import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { AuthService } from '../auth.service';
import { UnauthorizedException } from '@nestjs/common';

export class UserStrategy extends PassportStrategy(Strategy, 'user') {
  constructor(private readonly authService: AuthService) {
    super({
      usernameField: 'phone',
    });
  }
  async validate(phone: string, password: string) {
    const user = await this.authService.validateUser(phone, password);
    const token = this.authService.generateToken(user);
    return token;
  }
}
