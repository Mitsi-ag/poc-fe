import { formatDate } from "@/lib/utils";
import { Chat } from "@/modules/chats/entity";

export const ChatsService = {
  processChats(chats: Chat[]): Chat[] {
    return chats.map((chat) => ({
      ...chat,
      created_at: formatDate(chat.created_at),
    }));
  },
};
