import { User } from '@prisma/client';

export class GetUserDto {
  public email: string;
  public username: string;
  private constructor(email: string, username: string) {
    this.email = email;
    this.username = username;
  }
  static fromUser(user: User) {
    return new this(user.email, user.username);
  }
}
