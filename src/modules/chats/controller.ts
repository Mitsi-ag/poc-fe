import { DEFAULT_ERROR_MESSAGE } from "@/lib/constants";
import { chatSchema } from "@/modules/chats/entity";
import { ChatsRepository } from "@/modules/chats/repository";
import { ChatsService } from "@/modules/chats/service";
import { responseSchema } from "@/modules/shared/response-schema";

export const ChatsController = {
  async fetchAll() {
    try {
      const data = await ChatsRepository.fetchAll();
      const parseResult = responseSchema(chatSchema).safeParse(data);
      if (!parseResult.success) {
        throw new Error(parseResult.error.message);
      }

      const chatsData = parseResult.data;
      chatsData.results = ChatsService.processChats(chatsData.results);
      return chatsData;
    } catch (error) {
      let message = DEFAULT_ERROR_MESSAGE;
      if (error instanceof Error) {
        message = error.message;
      }
      throw new Error(message);
    }
  },
};
