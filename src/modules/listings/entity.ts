import { z } from "zod";

const propertyStatusMap: Record<number, string> = {
  1: "For Rent",
  2: "For Sale",
};

export const listingSchema = z.object({
  id: z.number(),
  address: z.object({
    id: z.number(),
    state: z.string().max(4),
    suburb: z.string().max(25),
    postcode: z.string().max(5),
    display_name: z.string(),
    latitude: z.number().nullable(),
    longitude: z.number().nullable(),
  }),
  agency: z
    .object({
      id: z.number(),
      url: z.string().url(),
      source_id: z.number(),
      description: z.string(),
      name: z.string(),
      email: z.string().email(),
      phone_number: z.string(),
      website: z.string().nullable(),
    })
    .nullable(),
  url: z.string().url(),
  source_id: z.number(),
  price: z.string().max(100).nullable(),
  type_of: z
    .number()
    .gte(1)
    .lte(2)
    .transform((n) => propertyStatusMap[n]),
  images: z.array(z.string()),
  features: z.array(z.string()),
  description: z.string(),
  short_description: z.string(),
  parking: z.number(),
  bedrooms: z.number(),
  bathrooms: z.number(),
  updated_on: z.string(),
  timestamp: z.string(),
  // source_created: z.string().nullable(),
  // source_updated: z.string().nullable(),
});

export type Listing = z.infer<typeof listingSchema>;
