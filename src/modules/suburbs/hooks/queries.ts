import { fetchAllSuburbs } from "@/modules/suburbs/actions";
import { useQuery } from "@tanstack/react-query";

export function useSuburbsQuery() {
  return useQuery({
    queryKey: ["all-suburbs"],
    queryFn: fetchAllSuburbs,
  });
}
