import { fetchAllCompetitors } from "@/modules/competitors/actions";
import { useQuery } from "@tanstack/react-query";

export function useCompetitorsQuery(
  page: number,
  pageSize: number,
  searchQuery: string,
) {
  return useQuery({
    queryKey: ["all-competitors", page, pageSize, searchQuery],
    queryFn: () => fetchAllCompetitors(page, pageSize, searchQuery),
  });
}
