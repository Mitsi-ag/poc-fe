"use server";

import { ChatsController } from "@/modules/chats/controller";

export function fetchAllChats() {
  return ChatsController.fetchAll();
}
