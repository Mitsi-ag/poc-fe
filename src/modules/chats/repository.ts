import { fetchAPI } from "@/modules/shared/fetch-api";

export const ChatsRepository = {
  fetchAll(): Promise<unknown> {
    return fetchAPI("chatbot/chats");
  },

  // TODO: TBD
  fetchById(id: string): Promise<unknown> {
    return fetchAPI(`chatbot/${id}`);
  },
};
