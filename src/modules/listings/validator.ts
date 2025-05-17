import { listingSchema } from "@/modules/listings/entity";
import { paginatedResponseSchema } from "@/modules/shared/response-schema";
import { z } from "zod";

const pageSchema = z.number().gte(1);

export const ListingsValidator = {
  validateListings(data: unknown) {
    const parseResult = paginatedResponseSchema(listingSchema).safeParse(data);
    if (!parseResult.success) {
      throw new Error(parseResult.error.message);
    }

    return parseResult.data;
  },

  validatePageNumber(page: unknown) {
    const parseResult = pageSchema.safeParse(page);
    if (!parseResult.success) {
      throw new Error(parseResult.error.message);
    }

    return parseResult.data;
  },
};
