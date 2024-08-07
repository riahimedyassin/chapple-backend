import { IsNotEmpty } from 'class-validator';

export class MessageModel<T> {
  @IsNotEmpty()
  content: string;
  @IsNotEmpty()
  to: T;
}
