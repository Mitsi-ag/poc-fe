import { fetchAllChats } from "@/modules/chats/actions";
import { useQuery } from "@tanstack/react-query";

export function useChatsQuery() {
  return useQuery({
    queryKey: ["all-chats"],
    queryFn: fetchAllChats,
  });
}
