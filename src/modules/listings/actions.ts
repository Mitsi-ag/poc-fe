"use server";

import { ListingsController } from "@/modules/listings/controller";

export async function fetchAllListings() {
  return await ListingsController.fetchAll();
}
