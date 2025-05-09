import { formatDate, toCapitalCase } from "@/lib/utils";
import { Listing } from "@/modules/listings/entity";

export const ListingsService = {
  processListings(listings: Listing[]): Listing[] {
    return listings.map((res) => ({
      ...res,
      timestamp: formatDate(res.timestamp),
      updated_on: formatDate(res.updated_on),
      address: {
        ...res.address,
        suburb: toCapitalCase(res.address.suburb),
      },
    }));
  },
};
