import { z } from "zod";

export const userSchema = z.object({
  id: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  email: z.string().email(),
  locations: z.array(z.string()),
  specializations: z.array(z.string()),
  experience: z.string(),
  goals: z.array(z.string()),
  preferredDashboardWidgets: z.array(z.string()),
});

export type User = z.infer<typeof userSchema>;
