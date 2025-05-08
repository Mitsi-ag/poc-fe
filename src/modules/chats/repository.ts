import { fetchAPI } from "@/modules/shared/fetch-api";

export const ChatsRepository = {
  fetchAll(): Promise<unknown> {
    return fetchAPI("chatbot/chats/");
  },
};
