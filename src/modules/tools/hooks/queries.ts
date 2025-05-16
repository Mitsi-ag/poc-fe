import { fetchAllTools } from "@/modules/tools/actions";
import { useQuery } from "@tanstack/react-query";

export function useToolsQuery() {
  return useQuery({
    queryKey: ["all-tools"],
    queryFn: fetchAllTools,
  });
}
