import { Listing } from "@/modules/listings/entities/listing.entity";
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
      if (data.message) {
        throw new Error(data.message);
      }
      return data.data;
    },
  });
}
