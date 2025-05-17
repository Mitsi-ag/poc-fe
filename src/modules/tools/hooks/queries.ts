import { fetchAllTools, fetchBookmarkedTools } from "@/modules/tools/actions";
import { useQuery } from "@tanstack/react-query";

export function useToolsQuery() {
  return useQuery({
    queryKey: ["all-tools"],
    queryFn: fetchAllTools,
  });
}

export function useBookmarkedToolsQuery() {
  return useQuery({
    queryKey: ["bookmarked-tools"],
    queryFn: fetchBookmarkedTools,
  });
}
