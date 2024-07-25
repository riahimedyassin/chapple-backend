import { GetMessageDto } from '@modules/message/dto';
import { Prisma, Message } from '@prisma/client';

export interface MessageGroup {
  date: Date;
  messages: GetMessageDto[];
}
export const groupByDate = (array: GetMessageDto[]) => {
  const groupedMessages: MessageGroup[] = [];
  let currentGroup: MessageGroup = null;
  array.forEach((message) => {
    const messageDate = new Date(
      message.sent_at.getFullYear(),
      message.sent_at.getMonth(),
      message.sent_at.getDate(),
    );
    if (
      !currentGroup ||
      currentGroup.date.getTime() !== messageDate.getTime()
    ) {
      currentGroup = {
        date: messageDate,
        messages: [],
      };
      groupedMessages.push(currentGroup);
    }
    currentGroup.messages.push(message);
  });
  return groupedMessages;
};
