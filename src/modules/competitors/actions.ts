"use server";

import { CompetitorsController } from "@/modules/competitors/controller";

export async function fetchAllCompetitors(
  page: number,
  pageSize: number,
  agencyName: string,
) {
  const params = new URLSearchParams();
  params.set("page", page.toString());
  params.set("page_size", pageSize.toString());
  params.set("agency__name", agencyName.toString());
  return CompetitorsController.fetchAll(params);
}
