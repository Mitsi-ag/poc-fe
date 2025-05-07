import { User } from "@/modules/users/entity";

export interface IAuthService {
  getUserId: () => Promise<string>;
  getUser: () => Promise<User>;
}
