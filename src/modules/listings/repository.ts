import { fetchAPI } from "@/modules/shared/fetch-api";

export const ListingsRepository = {
  fetchAll(filters?: URLSearchParams): Promise<unknown> {
    let queryString = "";
    if (filters) {
      queryString = filters.toString();
    }

    return fetchAPI(`listings/?${queryString}`);
  },
};
