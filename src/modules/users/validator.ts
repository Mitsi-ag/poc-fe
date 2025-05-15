import { authTokenResponseSchema } from "@/modules/shared/response-schema";
import { userSchema } from "@/modules/users/entity";

export const UsersValidator = {
  validateAuthTokenResponse(data: unknown) {
    return authTokenResponseSchema.parse(data);
  },
  validtaeUpdateUserResponse(data: unknown) {
    return userSchema.parse(data);
  },
};
