import { listingSchema } from "@/modules/listings/entity";
import { paginatedResponseSchema } from "@/modules/shared/response-schema";

export const ListingsValidator = {
  validateListings(data: unknown) {
    const parseResult = paginatedResponseSchema(listingSchema).safeParse(data);
    if (!parseResult.success) {
      throw new Error(parseResult.error.message);
    }

    return parseResult.data;
  },
};
