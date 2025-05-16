import { fetchAPI } from "@/modules/shared/fetch-api";

export const ToolsRepository = {
  fetchAll(): Promise<unknown> {
    return fetchAPI("chatbot/tools/");
  },
};
