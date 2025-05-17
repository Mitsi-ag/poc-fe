import { fetchAPI } from "@/modules/shared/fetch-api";

export const ListingsRepository = {
  fetchPaginated(page: number): Promise<unknown> {
    return fetchAPI(`listings/?page=${page}`);
  },
};
