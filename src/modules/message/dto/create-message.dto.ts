import { IsEmpty } from 'class-validator';

export class createMessageDto {
  constructor(
    public toEmail: string,
    public content: string,
    public fromEmail: string,
  ) {}
}
