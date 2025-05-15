"use server";

import { SuburbsController } from "@/modules/suburbs/controller";

export async function fetchAllSuburbs() {
  return SuburbsController.fetchAll();
}
