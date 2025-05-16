import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toggleCompetitorBookmark } from "@/modules/competitors/actions";

export function useBookmarkCompetitor() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (agentId: number) => toggleCompetitorBookmark(agentId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["all-competitors"] });
    },
  });
}
