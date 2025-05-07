import { fetchAllMessages } from "@/modules/messages/actions";
import { useQuery } from "@tanstack/react-query";

export function useMessagesQuery() {
  return useQuery({
    queryKey: ["all-listings"],
    queryFn: fetchAllMessages,
  });
}
