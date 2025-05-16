"use server";

import { CompetitorsController } from "@/modules/competitors/controller";

export async function fetchAllCompetitors(
  page: number,
  pageSize: number,
  searchQuery: string,
) {
  const params = new URLSearchParams();
  params.set("page", page.toString());
  params.set("page_size", pageSize.toString());
  params.set("q", searchQuery.toString());
  return CompetitorsController.fetchAll(params);
}

export async function toggleCompetitorBookmark(agentId: number) {
  return CompetitorsController.toggleBookmark(agentId);
}
