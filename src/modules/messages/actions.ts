"use server";

import { MessagesController } from "@/modules/messages/controller";

export function fetchAllMessages() {
  return MessagesController.fetchAll();
}
