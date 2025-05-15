import { Suburb } from "@/modules/suburbs/entity";
import { SuburbsRepository } from "@/modules/suburbs/repository";

export const SuburbsController = {
  async fetchAll() {
    const data = (await SuburbsRepository.fetchAll()) as Suburb[];
    return data;
  },
};
