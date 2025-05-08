"use server";

import { MessagesController } from "@/modules/messages/controller";

export async function fetchAllMessages(cursor: string) {
  return MessagesController.fetchAll(cursor);
}
