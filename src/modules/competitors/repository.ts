import { fetchAPI } from "@/modules/shared/fetch-api";

export const CompetitorsRepository = {
  fetchAll(filters?: URLSearchParams): Promise<unknown> {
    let queryString = "";
    if (filters) {
      queryString = filters.toString();
    }

    return fetchAPI(`agencies/agents${queryString}`);
  },
};
