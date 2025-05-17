import { fetchPaginatedListings } from "@/modules/listings/actions";
import { useInfiniteQuery } from "@tanstack/react-query";

export function useListingsQuery() {
  return useInfiniteQuery({
    queryKey: ["paginated-listings"],
    queryFn: ({ pageParam }) => fetchPaginatedListings(pageParam),
    initialPageParam: 1,
    getNextPageParam: (lastPage, _allPages, lastPageParam) => {
      if (!lastPage.next) return null;
      return lastPageParam + 1;
    },
    select: (data) => data.pages.flatMap((page) => page.results),
  });
}
