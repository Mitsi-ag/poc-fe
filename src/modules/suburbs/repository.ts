import { fetchAPI } from "@/modules/shared/fetch-api";

export const SuburbsRepository = {
  fetchAll(): Promise<unknown> {
    return fetchAPI("listings/_suburbs/");
  },
};
