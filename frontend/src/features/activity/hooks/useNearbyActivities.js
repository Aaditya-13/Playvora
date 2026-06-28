import { useQuery } from "@tanstack/react-query";

import QUERY_KEYS from "../../../constants/queryKeys.js";
import { DEFAULT_SEARCH_PARAMS } from "../../../constants/search.js";

import { getNearbyActivities } from "../api/activity.api.js";

export default function useNearbyActivities(params = {}) {
  return useQuery({
    queryKey: [
      QUERY_KEYS.NEARBY_ACTIVITIES,
      params,
    ],

    queryFn: () =>
      getNearbyActivities({
        ...DEFAULT_SEARCH_PARAMS,
        ...params,
      }),

    staleTime: 60 * 1000,
  });
}