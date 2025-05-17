import { createBookmarkedTool } from "@/modules/tools/actions";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useBookmarkToolMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["create-bookmarked-tool"],
    mutationFn: async (toolId: number) => await createBookmarkedTool(toolId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["bookmarked-tools"],
      });
    },
  });
}
