import { User } from "@/modules/users/entities/user.entity";

export interface IAuthService {
  getUserId: () => Promise<string>;
  getUser: () => Promise<User>;
}
