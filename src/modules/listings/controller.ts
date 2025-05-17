import { ListingsRepository } from "@/modules/listings/repository";
import { ListingsService } from "@/modules/listings/service";
import { ListingsValidator } from "@/modules/listings/validator";

export const ListingsController = {
  async fetchPaginated(page: number) {
    const validatedPage = ListingsValidator.validatePageNumber(page);
    const data = await ListingsRepository.fetchPaginated(validatedPage);
    const listingsData = ListingsValidator.validateListings(data);
    listingsData.results = ListingsService.processListings(
      listingsData.results,
    );
    return listingsData;
  },
};
