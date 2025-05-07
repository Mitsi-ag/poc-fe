import { chatSchema } from "@/modules/chats/entity";
import { paginatedResponseSchema } from "@/modules/shared/response-schema";

export const ChatsValidator = {
  validateChats(data: unknown) {
    const parseResult = paginatedResponseSchema(chatSchema).safeParse(data);
    if (!parseResult.success) {
      throw new Error(parseResult.error.message);
    }

    return parseResult.data;
  },
};
