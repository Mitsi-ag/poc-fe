import { fetchAPI } from "@/modules/shared/fetch-api";
import { User } from "@/modules/users/entity";

export const UsersRepository = {
  getAuthToken(clerk_token: string): Promise<unknown> {
    return fetchAPI("users/token/", {
      method: "POST",
      body: JSON.stringify({ clerk_token }),
    });
  },
  updateUser(userData: Partial<User>): Promise<unknown> {
    return fetchAPI("users/me", {
      method: "PUT",
      body: JSON.stringify(userData),
    });
  },
};
