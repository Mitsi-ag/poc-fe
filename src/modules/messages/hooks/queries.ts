import { fetchAllMessages } from "@/modules/messages/actions";
import { useInfiniteQuery } from "@tanstack/react-query";

export function useMessagesQuery() {
  return useInfiniteQuery({
    queryKey: ["all-messages"],
    queryFn: async ({ pageParam }) => await fetchAllMessages(pageParam),
    initialPageParam: "",
    getNextPageParam: (lastPage) => {
      if (lastPage.next) {
        const { searchParams } = new URL(lastPage.next);
        const nextCursor = searchParams.get("cursor");
        if (nextCursor) {
          return nextCursor;
        }
      }

      return "";
    },
    getPreviousPageParam: (firstPage) => {
      if (firstPage.previous) {
        const { searchParams } = new URL(firstPage.previous);
        const previousCursor = searchParams.get("cursor");
        if (previousCursor) {
          return previousCursor;
        }
      }

      return "";
    },
    select: (data) => data.pages.flatMap((page) => page.results),
  });
}
