import { fetchAllListings } from "@/modules/listings/actions";
import { useQuery } from "@tanstack/react-query";

export function useListingsQuery() {
  return useQuery({
    queryKey: ["all-listings"],
    queryFn: fetchAllListings,
  });
}
