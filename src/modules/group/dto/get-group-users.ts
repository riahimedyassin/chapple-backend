import { GetUserDto } from '@common/DTO/get-user.dto';
import { User } from '@prisma/client';

export class GetUsersGroupDto {
  static fromPlainGroupResponse(
    response: {
      user_group: {
        user: {
          email: string;
          username: string;
        };
      }[];
    }[],
  ) {
    return response[0].user_group.map((user) => user.user);
  }
}
