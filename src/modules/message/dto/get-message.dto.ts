import { MessageGroup } from '@common/utils';
import { Message } from '@prisma/client';

export class GetMessageDto {
  public readonly id: number;
  public readonly content: string;
  public readonly from: string;
  public readonly sent_at?: Date;
  public readonly groupId?: number;
  constructor(message: any, requestEmail: string) {
    this.id = message.id;
    this.content = message.content;
    this.from = message.fromEmail == requestEmail ? 'me' : 'user';
    if (message.sent_at) this.sent_at = message.sent_at;
    if (message.groupId) this.groupId = message.groupId;
  }
}
