import { IAuthService } from "@/modules/auth/service.interface";
import { User } from "@/modules/users/entity";

const user: User = {
  id: crypto.randomUUID(),
  firstName: "John",
  lastName: "Smith",
  email: "johnsmith@gmail.com",
  experience: "",
  goals: [],
  locations: [],
  specializations: [],
  preferredDashboardWidgets: [],
};

export const ClientAuthService: IAuthService = {
  async getUserId(): Promise<string> {
    return user.id;
  },

  async getUser(): Promise<User> {
    return user;
  },
};
