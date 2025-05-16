import { z } from "zod";

export const toolSchema = z.object({
  id: z.number(),
  name: z.string().nonempty(),
  category: z.string().nonempty(),
  description: z.string().nonempty(),
  prompt: z.string().nonempty(),
});

export type Tool = z.infer<typeof toolSchema>;
