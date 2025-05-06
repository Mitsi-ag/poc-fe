import { IAuthService } from "@/modules/auth/services/iauth.service";
import { User } from "@/modules/users/entities/user.entity";

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

// TODO: TBI
export class ClientAuthService implements IAuthService {
  async getUserId(): Promise<string> {
    return user.id;
  }

  async getUser(): Promise<User> {
    return user;
  }
}

// TODO: TBI
export class ServerAuthService implements IAuthService {
  async getUserId(): Promise<string> {
    return user.id;
  }

  async getUser(): Promise<User> {
    return user;
  }
}
