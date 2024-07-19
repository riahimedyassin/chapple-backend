import { IsEmail, IsInt, IsNotEmpty } from 'class-validator';

export class CreateGroupMessageDto {
  @IsInt()
  group: number;
  @IsEmail()
  sent_by: string;
  @IsNotEmpty()
  content: string;
}
