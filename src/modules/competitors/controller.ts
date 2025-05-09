import { DEFAULT_ERROR_MESSAGE } from "@/lib/constants";
import { Competitor } from "@/modules/competitors/entity";
import { CompetitorsRepository } from "@/modules/competitors/repository";
import { CompetitorsService } from "@/modules/competitors/service";
import { CompetitorsValidator } from "@/modules/competitors/validator";
import { PaginatedResponse } from "@/modules/shared/response-schema";

export const CompetitorsController = {
  async fetchAll(
    filters?: URLSearchParams,
  ): Promise<PaginatedResponse<Competitor> | null> {
    try {
      const data = await CompetitorsRepository.fetchAll(filters);
      const competitorsData = CompetitorsValidator.validateListings(data);
      competitorsData.results = CompetitorsService.processCompetitors(
        competitorsData.results,
      );
      return competitorsData;
    } catch (error) {
      const message =
        error instanceof Error ? error.message : DEFAULT_ERROR_MESSAGE;
      throw new Error(message);
    }
  },
};
