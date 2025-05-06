import { listingSchema } from "@/modules/listings/entites/listing.entity";
import { responseSchema } from "@/modules/shared/response-schema";
import { ResponseWrapper } from "@/types/response-wrapper";
import { useQuery } from "@tanstack/react-query";

export function useListingsQuery() {
  return useQuery({
    queryKey: ["all-listings"],
    queryFn: async () => {
      const response = await fetch("/api/listings");
      const data = (await response.json()) as ResponseWrapper<unknown>;
      const parseResult = responseSchema(listingSchema).safeParse(data.data);
      if (!parseResult.success) {
        console.error(parseResult.error);
        return null;
      }

      const listingsData = parseResult.data;
      listingsData.results.forEach((res) => {
        res.timestamp = new Date(res.timestamp).toDateString();
        res.updated_on = new Date(res.updated_on).toDateString();
      });
      return listingsData;
    },
  });
}
