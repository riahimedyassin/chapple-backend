import { Message } from '@prisma/client';

export class GetMessageDto {
  public readonly id: number;
  public readonly content: string;
  public readonly from: string;
  public readonly sent_at: Date;
  constructor(message: Message, requestEmail: string) {
    this.id = message.id;
    this.content = message.content;
    this.from = message.fromEmail == requestEmail ? 'me' : 'user';
    this.sent_at = message.sent_at;
  }
}
