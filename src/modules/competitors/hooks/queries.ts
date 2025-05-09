import { fetchAllCompetitors } from "@/modules/competitors/actions";
import { useQuery } from "@tanstack/react-query";

export function useCompetitorsQuery(
  page: number,
  pageSize: number,
  agencyName: string,
) {
  return useQuery({
    queryKey: ["all-competitors", page, pageSize, agencyName],
    queryFn: () => fetchAllCompetitors(page, pageSize, agencyName),
  });
}
