import { z } from "zod";

export const userSchema = z.object({
  first_name: z.string().optional(),
  last_name: z.string().optional(),
  username: z.string().nullable().optional(),
  email: z.string().email().optional(),
  role: z.string().optional(),
  company_name: z.string().optional(),
  locations: z.array(z.string()).optional(),
  specializations: z.array(z.string()).optional(),
  experience_level: z.number().optional(),
  goals: z.array(z.string()).optional(),
  dashboard_widgets: z.array(z.string()).optional(),
});

export type User = z.infer<typeof userSchema>;
