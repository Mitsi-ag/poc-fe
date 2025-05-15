"use server";

import { MessagesController } from "@/modules/messages/controller";

export async function fetchAllMessages(cursor: string) {
  return MessagesController.fetchAll(cursor);
}

export async function fetchMessagesByChatId(
  chatId: string | undefined,
  cursor: string,
) {
  return MessagesController.fetchByChatId(chatId, cursor);
}

export async function saveUserMessage(content: string, chatId?: string) {
  return await MessagesController.create({
    chat_id: chatId ? parseInt(chatId) : null,
    text: content,
    input_tokens: 0,
    output_tokens: 0,
    by_user: true,
    tool_calls: [],
  });
}
