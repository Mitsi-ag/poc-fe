import { Listing } from "@/modules/listings/entites/listing.entity";
import { APIResponse } from "@/modules/shared/response-schema";
import { ResponseWrapper } from "@/types/response-wrapper";
import { useQuery } from "@tanstack/react-query";

export function useListingsQuery() {
  return useQuery({
    queryKey: ["all-listings"],
    queryFn: async () => {
      const response = await fetch("/api/listings");
      const data = (await response.json()) as ResponseWrapper<
        APIResponse<Listing>
      >;
      return data.data.results.map((res) => ({
        ...res,
        timestamp: new Date(res.timestamp).toDateString(),
        updated_on: new Date(res.updated_on).toDateString(),
      }));
    },
  });
}
