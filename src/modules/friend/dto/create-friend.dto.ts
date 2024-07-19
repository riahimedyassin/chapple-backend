import { IsEmail, IsNotEmpty } from 'class-validator';

export class CreateFriendDto {
  @IsEmail()
  @IsNotEmpty()
  sent_to: string;
}
