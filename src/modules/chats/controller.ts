import { ChatsRepository } from "@/modules/chats/repository";
import { ChatsService } from "@/modules/chats/service";
import { ChatsValidator } from "@/modules/chats/validator";

export const ChatsController = {
  async fetchAll(cursor: string) {
    const data = await ChatsRepository.fetchAll(cursor);
    const chatsData = ChatsValidator.validateChats(data);
    chatsData.results = ChatsService.processChats(chatsData.results);
    return chatsData;
  },
};
