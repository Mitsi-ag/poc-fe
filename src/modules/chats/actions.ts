"use server";

import { ChatsController } from "@/modules/chats/controller";

export async function fetchAllChats(page: number) {
  return ChatsController.fetchAll(page);
}
