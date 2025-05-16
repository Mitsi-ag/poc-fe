import { useMutation } from "@tanstack/react-query";
import { getAuthToken, updateUser } from "@/modules/users/actions";
import { storeAuthToken } from "@/lib/utils";
import { User } from "@/modules/users/entity";

export function useGetAuthToken() {
  return useMutation({
    mutationFn: (clerk_token: string) => {
      return getAuthToken(clerk_token);
    },
    onSuccess: (data) => {
      storeAuthToken(data.auth_token);
    },
  });
}

export function useUpdateUser() {
  return useMutation({
    mutationFn: (userData: User) => updateUser(userData),
    onSuccess: (data) => {
      console.log("updated user data:", data);
    },
  });
}
