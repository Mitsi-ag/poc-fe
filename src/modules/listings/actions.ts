"use server";

import { ListingsController } from "@/modules/listings/controller";

export async function fetchPaginatedListings(page: number) {
  return ListingsController.fetchPaginated(page);
}
