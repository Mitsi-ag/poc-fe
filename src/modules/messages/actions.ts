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
