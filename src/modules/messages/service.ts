import { formatDate } from "@/lib/utils";
import { Message } from "@/modules/messages/entity";

export const MessagesService = {
  processMessageList(messages: Message[]): Message[] {
    return messages.map(this.processMessage).toReversed();
  },

  processMessage(message: Message): Message {
    return {
      ...message,
      created_at: formatDate(message.created_at),
    };
  },
};
