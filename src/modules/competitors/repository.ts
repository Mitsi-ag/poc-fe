import { fetchAPI } from "@/modules/shared/fetch-api";

export const CompetitorsRepository = {
  fetchAll(filters?: URLSearchParams): Promise<unknown> {
    let queryString = "";
    if (filters && filters.toString()) {
      queryString = `?${filters.toString()}`;
    }

    return fetchAPI(`agencies/competition${queryString}`);
  },

  toggleBookmark(agentId: number): Promise<unknown> {
    return fetchAPI("agencies/bookmark/", {
      method: "POST",
      body: JSON.stringify({ agent_id: agentId.toString() }),
    });
  },
};
