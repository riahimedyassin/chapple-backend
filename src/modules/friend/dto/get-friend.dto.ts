import { Friend } from '@prisma/client';

type friend = {
  username: string;
  email: string;
};

export class GetFriendDto {
  public readonly id: number;
  public readonly sent_at: Date;
  public readonly friend: friend;
  constructor(friend: any, request_email: string) {
    this.id = friend.id;
    this.sent_at = friend.sent_at;

    this.friend =
      friend.sent_by.email === request_email
        ? {
            email: friend.sent_to.email,
            username: friend.sent_to.username,
          }
        : {
            email: friend.sent_by.email,
            username: friend.sent_by.username,
          };
  }
}
