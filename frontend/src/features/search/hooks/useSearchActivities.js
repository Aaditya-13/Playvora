import { useQuery } from "@tanstack/react-query";

import QUERY_KEYS from "../../../constants/queryKeys";
import { searchActivities } from "../api/search.api";

export default function useSearchActivities(query) {
  return useQuery({
    queryKey: [...QUERY_KEYS.SEARCH, query],

    queryFn: () => searchActivities(query),

    enabled: query.trim().length > 0,
  });
}