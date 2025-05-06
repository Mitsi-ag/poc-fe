import { DEFAULT_ERROR_MESSAGE } from "@/lib/constants";
import {
  Listing,
  listingSchema,
} from "@/modules/listings/entities/listing.entity";
import { ListingsRepository } from "@/modules/listings/repository";
import { ListingService } from "@/modules/listings/service";
import { APIResponse, responseSchema } from "@/modules/shared/response-schema";

export class ListingsController {
  private readonly repository: ListingsRepository = new ListingsRepository();
  private readonly service: ListingService = new ListingService();

  /**
   * @throws Error if error in fetching or validating data from backend
   */
  async fetchAll(filters?: URLSearchParams): Promise<APIResponse<Listing>> {
    try {
      const data = await this.repository.fetchAll(filters);
      const parseResult = responseSchema(listingSchema).safeParse(data);
      if (!parseResult.success) {
        throw new Error(parseResult.error.message);
      }

      const listingsData = parseResult.data;
      listingsData.results = this.service.processListings(listingsData.results);
      return listingsData;
    } catch (error) {
      let message = DEFAULT_ERROR_MESSAGE;
      if (error instanceof Error) {
        message = error.message;
      }
      throw new Error(message);
    }
  }
}
