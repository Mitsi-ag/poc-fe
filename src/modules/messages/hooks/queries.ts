import { fetchMessagesByChatId } from "@/modules/messages/actions";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";

/**
 * @returns Messages for a particular chatId
 */
export function useMessagesByChatIdQuery() {
  const { id } = useParams<{ id: string }>();

  return useInfiniteQuery({
    queryKey: ["all-messages", id],
    queryFn: async ({ pageParam }) =>
      await fetchMessagesByChatId(id, pageParam),
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
