import { IsEmpty } from 'class-validator';

export class createMessageDto {
  toPhone: string;
  content: string;
  fromPhone : string
}
