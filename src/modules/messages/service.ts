import { formatDate } from "@/lib/utils";
import { Message } from "@/modules/messages/entity";

export const MessagesService = {
  processMessages(messages: Message[]): Message[] {
    return messages.map((message) => ({
      ...message,
      created_at: formatDate(new Date(message.created_at).toDateString()),
    }));
  },
};
