import { CreateMessageDto } from "@/modules/messages/dtos/create-message.dto";
import { fetchAPI } from "@/modules/shared/fetch-api";

export const MessagesRepository = {
  fetchAll(cursor: string): Promise<unknown> {
    const queryString = cursor ? `?cursor=${cursor}` : "";
    return fetchAPI(`chatbot/messages/${queryString}`);
  },

  fetchByChatId(id: string): Promise<unknown> {
    return fetchAPI(`chatbot/messages/?chat=${id}`);
  },

  create(payload: CreateMessageDto): Promise<unknown> {
    return fetchAPI("chatbot/messages/", {
      method: "POST",
      body: JSON.stringify(payload),
    });
  },
};
