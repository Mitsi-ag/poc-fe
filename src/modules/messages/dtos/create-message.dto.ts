import { Message } from "@/modules/messages/entity";

export type CreateMessageDto = Omit<Message, "id" | "created_at">;
