"use server";

import { ChatsController } from "@/modules/chats/controller";

export async function fetchAllChats() {
  return await ChatsController.fetchAll();
}
