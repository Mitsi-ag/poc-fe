"use server";

import { CompetitorsController } from "@/modules/competitors/controller";

export async function fetchAllCompetitors() {
  return CompetitorsController.fetchAll();
}
