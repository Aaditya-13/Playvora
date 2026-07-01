import { useQuery } from "@tanstack/react-query";
import QUERY_KEYS from "../../../constants/queryKeys.js";
import { getActivityDetails } from "../api/activity.api.js";

export default function useActivityDetails(activityId) {
  return useQuery({
    queryKey: [
      ...QUERY_KEYS.ACTIVITY_DETAILS,
      activityId,
    ],
    queryFn: () => getActivityDetails(activityId),
    enabled: !!activityId,
    staleTime: 5 * 60 * 1000,
  });
}