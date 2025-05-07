import { z } from "zod";

export const messageSchema = z.object({
  id: z.number(),
  chat_id: z.number(),
  tool_calls: z.array(z.string()),
  text: z.string(),
  by_user: z.boolean(),
  created_at: z.string(),
  input_tokens: z.number(),
  output_tokens: z.number(),
});

export type Message = z.infer<typeof messageSchema>;
