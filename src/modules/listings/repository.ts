import { fetchAPI } from "@/modules/shared/fetchApi";

export class ListingsRepository {
  async fetchAll(filters?: URLSearchParams): Promise<unknown> {
    let queryString = "";
    if (filters) {
      queryString = filters.toString();
    }

    return await fetchAPI(`listings${queryString}`);
  }
}
