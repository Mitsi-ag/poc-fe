import { fetchAllCompetitors } from "@/modules/competitors/actions";
import { useQuery } from "@tanstack/react-query";

export function useCompetitorsQuery() {
  return useQuery({
    queryKey: ["all-competitors"],
    queryFn: fetchAllCompetitors,
  });
}
