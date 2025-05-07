import { DEFAULT_ERROR_MESSAGE } from "@/lib/constants";
import { Listing } from "@/modules/listings/entity";
import { ListingsRepository } from "@/modules/listings/repository";
import { ListingsService } from "@/modules/listings/service";
import { ListingsValidator } from "@/modules/listings/validator";
import { PaginatedResponse } from "@/modules/shared/response-schema";

export const ListingsController = {
  async fetchAll(
    filters?: URLSearchParams,
  ): Promise<PaginatedResponse<Listing>> {
    try {
      const data = await ListingsRepository.fetchAll(filters);
      const listingsData = ListingsValidator.validateListings(data);
      listingsData.results = ListingsService.processListings(
        listingsData.results,
      );
      return listingsData;
    } catch (error) {
      const message =
        error instanceof Error ? error.message : DEFAULT_ERROR_MESSAGE;
      throw new Error(message);
    }
  },
};
