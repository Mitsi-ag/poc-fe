import { z } from "zod";

export const chatSchema = z.object({
  id: z.number(),
  name: z.string().max(155),
  created_at: z.string(),
  message_count: z.number(),
});

export type Chat = z.infer<typeof chatSchema>;
