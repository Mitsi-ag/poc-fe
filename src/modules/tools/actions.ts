"use server";

import { ToolsController } from "@/modules/tools/controller";

export async function fetchAllTools() {
  return ToolsController.fetchAll();
}
