import { competitorSchema } from "@/modules/competitors/entity";
import { paginatedResponseSchema } from "@/modules/shared/response-schema";

export const CompetitorsValidator = {
  validateListings(data: unknown) {
    const parseResult =
      paginatedResponseSchema(competitorSchema).safeParse(data);
    if (!parseResult.success) {
      throw new Error(parseResult.error.message);
    }

    return parseResult.data;
  },
};
