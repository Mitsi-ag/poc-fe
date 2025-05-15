"use server";

import { ChatsController } from "@/modules/chats/controller";

export async function fetchAllChats(cursor: string) {
  return ChatsController.fetchAll(cursor);
}
