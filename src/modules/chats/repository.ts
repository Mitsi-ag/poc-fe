import { fetchAPI } from "@/modules/shared/fetch-api";

export const ChatsRepository = {
  fetchAll(page: number): Promise<unknown> {
    return fetchAPI(`chatbot/chats/?page=${page}`);
  },
};
