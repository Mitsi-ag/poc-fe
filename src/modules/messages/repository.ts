import { CreateMessageDto } from "@/modules/messages/dtos/create-message.dto";
import { fetchAPI } from "@/modules/shared/fetch-api";

export const MessagesRepository = {
  fetchAll(cursor: string): Promise<unknown> {
    const queryParams = new URLSearchParams();
    queryParams.set("cursor", cursor);
    const queryString = `?${queryParams.toString()}`;
    return fetchAPI(`chatbot/messages/${queryString}`);
  },

  fetchByChatId(id: string, cursor: string): Promise<unknown> {
    const queryParams = new URLSearchParams();
    queryParams.set("chat", id);
    queryParams.set("cursor", cursor);
    const queryString = `?${queryParams.toString()}`;
    return fetchAPI(`chatbot/messages/${queryString}`);
  },

  create(payload: CreateMessageDto): Promise<unknown> {
    return fetchAPI("chatbot/messages/", {
      method: "POST",
      body: JSON.stringify(payload),
    });
  },
};
