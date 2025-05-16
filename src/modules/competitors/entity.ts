import { z } from "zod";

export const competitorSchema = z.object({
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
  listing_count: z.number(),
  name: z.string(),
  job_title: z.string(),
  email: z.string().email().nullable(),
  phone_numbers: z.array(z.string().nullable()),
  is_bookmarked: z.boolean(),
});

export type Competitor = z.infer<typeof competitorSchema>;
