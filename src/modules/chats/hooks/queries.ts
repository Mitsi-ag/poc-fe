import { fetchAllChats } from "@/modules/chats/actions";
import { useInfiniteQuery } from "@tanstack/react-query";

export function useChatsQuery() {
  return useInfiniteQuery({
    queryKey: ["all-chats"],
    queryFn: async ({ pageParam }) => await fetchAllChats(pageParam),
    initialPageParam: "",
    getNextPageParam: (lastPage) => {
      if (!lastPage.next) {
        return null;
      }

      return new URL(lastPage.next).searchParams.get("cursor");
    },
    select: (data) => data.pages.flatMap((page) => page.results),
  });
}
