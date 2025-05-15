import { z } from "zod";

export const suburbSchema = z.tuple([z.string(), z.string().length(4)]);

export type Suburb = z.infer<typeof suburbSchema>;
