import { fetchAPI } from "@/modules/shared/fetch-api";

export const MessagesRepository = {
  fetchAll(): Promise<unknown> {
    return fetchAPI("chatbot/messages");
  },

  fetchByChatId(id: string): Promise<unknown> {
    return fetchAPI(`chatbot/messages?chat=${id}`);
  },
};
