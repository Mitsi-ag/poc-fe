import { Tool } from "@/modules/tools/entity";
import { ToolsRepository } from "@/modules/tools/repository";

export const ToolsController = {
  async fetchAll() {
    const data = (await ToolsRepository.fetchAll()) as Tool[];
    return data;
  },
};
