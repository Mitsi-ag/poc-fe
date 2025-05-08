import { CreateMessageDto } from "@/modules/messages/dtos/create-message.dto";
import { MessagesRepository } from "@/modules/messages/repository";
import { MessagesService } from "@/modules/messages/service";
import { MessagesValidator } from "@/modules/messages/validator";

export const MessagesController = {
  async fetchAll(cursor: string) {
    const data = await MessagesRepository.fetchAll(cursor);
    const messagesData = MessagesValidator.validateMessageList(data);
    messagesData.results = await MessagesService.processMessageList(
      messagesData.results,
    );
    return messagesData;
  },

  async create(payload: CreateMessageDto) {
    const data = await MessagesRepository.create(payload);
    const createdMessage = MessagesValidator.validateMessage(data);
    return MessagesService.processMessage(createdMessage);
  },
};
