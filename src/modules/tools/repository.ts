import { fetchAPI } from "@/modules/shared/fetch-api";

export const ToolsRepository = {
  fetchAll(): Promise<unknown> {
    return fetchAPI("chatbot/tools/");
  },

  fetchBookmarked(): Promise<unknown> {
    return fetchAPI("chatbot/tools/bookmarked/");
  },

  createBookmark(toolId: number): Promise<unknown> {
    return fetchAPI("chatbot/tools/bookmark/", {
      method: "POST",
      body: JSON.stringify({
        tool_id: toolId,
      }),
    });
  },
};
