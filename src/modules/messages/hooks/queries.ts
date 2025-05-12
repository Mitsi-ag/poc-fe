import { fetchMessagesByChatId } from "@/modules/messages/actions";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";

/**
 * @returns Messages for a particular chatId
 */
export function useMessagesByChatIdQuery() {
  const { id } = useParams<{ id?: string }>();

  return useInfiniteQuery({
    queryKey: ["all-messages", id],
    queryFn: async ({ pageParam }) =>
      await fetchMessagesByChatId(id, pageParam),
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
