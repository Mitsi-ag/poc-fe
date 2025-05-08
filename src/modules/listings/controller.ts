import { ListingsRepository } from "@/modules/listings/repository";
import { ListingsService } from "@/modules/listings/service";
import { ListingsValidator } from "@/modules/listings/validator";

export const ListingsController = {
  async fetchAll(filters?: URLSearchParams) {
    const data = await ListingsRepository.fetchAll(filters);
    const listingsData = ListingsValidator.validateListings(data);
    listingsData.results = ListingsService.processListings(
      listingsData.results,
    );
    return listingsData;
  },
};
