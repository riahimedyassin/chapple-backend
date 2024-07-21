import { Message } from '@prisma/client';

export class GetMessageDto {
  public readonly id: number;
  public readonly content: string;
  public readonly from: string;
  constructor(message: Message) {
    this.id = message.id;
    this.content = message.content;
    this.from = message.fromEmail;
  }
}
