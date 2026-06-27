import { useQuery } from "@tanstack/react-query";

import QUERY_KEYS from "../../../constants/queryKeys";
import { getCurrentUser } from "../api/auth.api";

export default function useCurrentUser(options = {}) {
  return useQuery({
    queryKey: QUERY_KEYS.CURRENT_USER,
    queryFn: getCurrentUser,
    retry: false,
    staleTime: 5 * 60 * 1000,
    ...options,
  });
}