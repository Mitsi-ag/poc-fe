import { DEFAULT_ERROR_MESSAGE } from "@/lib/constants";
import { ChatsRepository } from "@/modules/chats/repository";
import { ChatsService } from "@/modules/chats/service";
import { ChatsValidator } from "@/modules/chats/validator";

export const ChatsController = {
  async fetchAll() {
    try {
      const data = await ChatsRepository.fetchAll();
      const chatsData = ChatsValidator.validateChats(data);
      chatsData.results = ChatsService.processChats(chatsData.results);
      return chatsData;
    } catch (error) {
      const message =
        error instanceof Error ? error.message : DEFAULT_ERROR_MESSAGE;
      throw new Error(message);
    }
  },
};
