"use server";

import { ToolsController } from "@/modules/tools/controller";

export async function fetchAllTools() {
  return ToolsController.fetchAll();
}

export async function fetchBookmarkedTools() {
  return ToolsController.fetchBookmarked();
}

export async function createBookmarkedTool(toolId: number) {
  return ToolsController.createBookmark(toolId);
}
