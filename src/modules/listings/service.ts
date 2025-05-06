import { formatDate, toCapitalCase } from "@/lib/utils";
import { Listing } from "@/modules/listings/entities/listing.entity";

export class ListingService {
  processListings(listings: Listing[]): Listing[] {
    return listings.map((res) => ({
      ...res,
      timestamp: formatDate(new Date(res.timestamp).toDateString()),
      updated_on: formatDate(new Date(res.updated_on).toDateString()),
      address: {
        ...res.address,
        suburb: toCapitalCase(res.address.suburb),
      },
      source_updated: res.source_updated
        ? formatDate(new Date(res.source_updated).toDateString())
        : null,
      source_created: res.source_created
        ? formatDate(new Date(res.source_created).toDateString())
        : null,
    }));
  }
}
