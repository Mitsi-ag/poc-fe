"use server";

import { UsersController } from "@/modules/users/controller";
import { User } from "@/modules/users/entity";

export async function getAuthToken(clerk_token: string) {
  return UsersController.getAuthToken(clerk_token);
}

export async function updateUser(userData: User) {
  return UsersController.updateUser(userData);
}
