import { Tool } from "@/modules/tools/entity";
import { ToolsRepository } from "@/modules/tools/repository";

export const ToolsController = {
  async fetchAll() {
    const data = (await ToolsRepository.fetchAll()) as Tool[];
    return data;
  },

  async fetchBookmarked() {
    const data = (await ToolsRepository.fetchBookmarked()) as Tool[];
    return data;
  },

  async createBookmark(toolId: number) {
    const bookmarkedTool = (await ToolsRepository.createBookmark(
      toolId,
    )) as Pick<Tool, "id" | "name">;
    return bookmarkedTool;
  },
};
