import { DEFAULT_ERROR_MESSAGE } from "@/lib/constants";
import { UsersValidator } from "@/modules/users/validator";
import { AuthTokenResponse } from "@/modules/shared/response-schema";
import { UsersRepository } from "@/modules/users/repository";
import { User } from "@/modules/users/entity";

export const UsersController = {
  async getAuthToken(clerk_token: string): Promise<AuthTokenResponse> {
    try {
      const data = await UsersRepository.getAuthToken(clerk_token);
      return UsersValidator.validateAuthTokenResponse(data);
    } catch (err) {
      const msg = err instanceof Error ? err.message : DEFAULT_ERROR_MESSAGE;
      throw new Error(msg);
    }
  },
  async updateUser(userData: User): Promise<User> {
    try {
      const data = await UsersRepository.updateUser(userData);
      return UsersValidator.validtaeUpdateUserResponse(data);
    } catch (err) {
      const msg = err instanceof Error ? err.message : DEFAULT_ERROR_MESSAGE;
      throw new Error(msg);
    }
  },
};
