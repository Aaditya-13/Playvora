import { useQuery } from "@tanstack/react-query";

import QUERY_KEYS from "../../../constants/queryKeys";

import { getNearbyActivities } from "../api/home.api.js";

export default function useNearbyActivities({
  latitude,
  longitude,
  sport,
}) {
  return useQuery({
    queryKey: [
      ...QUERY_KEYS.NEARBY_ACTIVITIES,
      latitude,
      longitude,
      sport,
    ],

    queryFn: () =>
      getNearbyActivities({
        latitude,
        longitude,
        sport,
      }),

    enabled:
      latitude != null &&
      longitude != null,
  });
}