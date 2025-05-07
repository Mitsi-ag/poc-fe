import { z } from "zod";

export const paginatedResponseSchema = <T extends z.ZodSchema>(
  innerSchema: T,
) =>
  z.object({
    results: z.array(innerSchema),
    next: z.string().url().nullable(),
    previous: z.string().url().nullable(),
    count: z.number().optional(),
  });

export type PaginatedResponse<T> = {
  results: T[];
  next: string | null;
  previous: string | null;
  count?: number | null;
};
