import { DEFAULT_ERROR_MESSAGE } from "@/lib/constants";
import { messageSchema } from "@/modules/messages/entity";
import { MessagesRepository } from "@/modules/messages/repository";
import { MessagesService } from "@/modules/messages/service";
import { responseSchema } from "@/modules/shared/response-schema";

export const MessagesController = {
  async fetchAll() {
    try {
      const data = await MessagesRepository.fetchAll();
      const parseResult = responseSchema(messageSchema).safeParse(data);
      if (!parseResult.success) {
        throw new Error(parseResult.error.message);
      }

      const messagesData = parseResult.data;
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
