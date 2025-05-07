import { DEFAULT_ERROR_MESSAGE } from "@/lib/constants";
import { MessagesRepository } from "@/modules/messages/repository";
import { MessagesService } from "@/modules/messages/service";
import { MessagesValidator } from "@/modules/messages/validator";

export const MessagesController = {
  async fetchAll() {
    try {
      const data = await MessagesRepository.fetchAll();
      const messagesData = MessagesValidator.validateMessages(data);
      messagesData.results = MessagesService.processMessages(
        messagesData.results,
      );
      return messagesData;
    } catch (error) {
      let message = DEFAULT_ERROR_MESSAGE;
      if (error instanceof Error) {
        message = error.message;
      }
      throw new Error(message);
    }
  },
};
