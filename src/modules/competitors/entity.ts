import { z } from "zod";

export const competitorSchema = z.object({
  //   count: z.number(),
  //   next: z.string().url().nullable(),
  //   previous: z.string().url().nullable(),
  //   results: z.array(
  //     z.object({
  id: z.number(),
  agency: z.object({
    id: z.number(),
    url: z.string(),
    source_id: z.number(),
    description: z.string(),
    name: z.string(),
    email: z.string().email(),
    phone_number: z.string(),
    website: z.string(),
  }),
  url: z.string(),
  source_id: z.string(),
  name: z.string(),
  job_title: z.string(),
  email: z.string().email().nullable(),
  phone_numbers: z.array(z.string().nullable()),
  // }),
  //   ),
});

export type Competitor = z.infer<typeof competitorSchema>;
