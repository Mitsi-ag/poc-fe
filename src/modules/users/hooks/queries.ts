import { ServerAuthService } from "@/modules/auth/services/auth.service";
import { useQuery } from "@tanstack/react-query";

export function useUserQuery() {
  return useQuery({
    queryKey: ["user-data"],
    queryFn: async () => {
      const auth = new ServerAuthService();
      return auth.getUser();
    },
  });
}
