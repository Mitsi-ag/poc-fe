import { Chat } from "@/modules/chats/entity";
import { APIResponse } from "@/modules/shared/response-schema";
import { ResponseWrapper } from "@/types/response-wrapper";
import { useQuery } from "@tanstack/react-query";

export function useChatsQuery() {
  return useQuery({
    queryKey: ["all-chats"],
    queryFn: async () => {
      const response = await fetch("/api/chatbot/chats");
      const data = (await response.json()) as ResponseWrapper<
        APIResponse<Chat>
      >;
      return data.data;
    },
  });
}
