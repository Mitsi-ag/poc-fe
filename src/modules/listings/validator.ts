import { listingSchema } from "@/modules/listings/entity";
import { responseSchema } from "@/modules/shared/response-schema";

export const ListingsValidator = {
  validateListings(data: unknown) {
    const parseResult = responseSchema(listingSchema).safeParse(data);
    if (!parseResult.success) {
      throw new Error(parseResult.error.message);
    }

    return parseResult.data;
  },
};
