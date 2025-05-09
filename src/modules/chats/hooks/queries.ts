import { fetchAllChats } from "@/modules/chats/actions";
import { useInfiniteQuery } from "@tanstack/react-query";

export function useChatsQuery() {
  return useInfiniteQuery({
    queryKey: ["all-chats"],
    queryFn: async ({ pageParam }) => await fetchAllChats(pageParam),
    initialPageParam: 1,
    getNextPageParam: (lastPage, _allPages, lastPageParam) =>
      lastPage.next ? lastPageParam + 1 : lastPageParam,
    getPreviousPageParam: (firstPage, _allPages, firstPageParam) =>
      firstPage.previous ? firstPageParam - 1 : firstPageParam,
    select: (data) => data.pages.flatMap((page) => page.results),
  });
}
