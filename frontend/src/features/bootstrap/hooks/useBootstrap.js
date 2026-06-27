import { useQuery } from "@tanstack/react-query";

import QUERY_KEYS from "../../../constants/queryKeys";
import { getBootstrap } from "../api/bootstrap.api";

export default function useBootstrap(options = {}) {
  return useQuery({
    queryKey: QUERY_KEYS.BOOTSTRAP,
    queryFn: getBootstrap,
    staleTime: 5 * 60 * 1000,
    ...options,
  });
}