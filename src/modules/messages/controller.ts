import { CreateMessageDto } from "@/modules/messages/dtos/create-message.dto";
import { Message } from "@/modules/messages/entity";
import { MessagesRepository } from "@/modules/messages/repository";
import { MessagesService } from "@/modules/messages/service";
import { MessagesValidator } from "@/modules/messages/validator";
import { PaginatedResponse } from "@/modules/shared/response-schema";

export const MessagesController = {
  async fetchAll(cursor: string): Promise<PaginatedResponse<Message>> {
    const data = await MessagesRepository.fetchAll(cursor);
    const messagesData = MessagesValidator.validateMessageList(data);
    messagesData.results = MessagesService.processMessageList(
      messagesData.results,
    );
    return messagesData;
  },

  async fetchByChatId(
    chatId: string | undefined,
    cursor: string,
  ): Promise<PaginatedResponse<Message>> {
    if (!chatId) {
      return {
        results: [],
        next: null,
        previous: null,
      };
    }

    const data = await MessagesRepository.fetchByChatId(chatId, cursor);
    const messagesData = MessagesValidator.validateMessageList(data);
    messagesData.results = MessagesService.processMessageList(
      messagesData.results,
    );
    return messagesData;
  },

  async create(payload: CreateMessageDto): Promise<Message> {
    const data = await MessagesRepository.create(payload);
    const createdMessage = MessagesValidator.validateMessage(data);
    return MessagesService.processMessage(createdMessage);
  },
};
