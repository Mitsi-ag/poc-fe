import { messageSchema } from "@/modules/messages/entity";
import { paginatedResponseSchema } from "@/modules/shared/response-schema";

export const MessagesValidator = {
  validateMessageList(data: unknown) {
    const parseResult = paginatedResponseSchema(messageSchema).safeParse(data);
    if (!parseResult.success) {
      throw new Error(parseResult.error.message);
    }

    return parseResult.data;
  },

  validateMessage(data: unknown) {
    const parseResult = messageSchema.safeParse(data);
    if (!parseResult.success) {
      throw new Error(parseResult.error.message);
    }

    return parseResult.data;
  },
};
