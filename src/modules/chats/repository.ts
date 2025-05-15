import { fetchAPI } from "@/modules/shared/fetch-api";

export const ChatsRepository = {
  fetchAll(cursor: string): Promise<unknown> {
    return fetchAPI(`chatbot/chats/?cursor=${cursor}`);
  },
};
