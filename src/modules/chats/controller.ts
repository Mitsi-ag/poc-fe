import { ChatsRepository } from "@/modules/chats/repository";
import { ChatsService } from "@/modules/chats/service";
import { ChatsValidator } from "@/modules/chats/validator";

export const ChatsController = {
  async fetchAll(page: number) {
    const data = await ChatsRepository.fetchAll(page);
    const chatsData = ChatsValidator.validateChats(data);
    chatsData.results = ChatsService.processChats(chatsData.results);
    return chatsData;
  },
};
