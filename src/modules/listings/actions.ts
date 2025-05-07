"use server";

import { ListingsController } from "@/modules/listings/controller";

export function fetchAllListings() {
  return ListingsController.fetchAll();
}
