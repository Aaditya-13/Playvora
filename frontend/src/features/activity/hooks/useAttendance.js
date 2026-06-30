import { useQuery } from "@tanstack/react-query";

import QUERY_KEYS from "../../../constants/queryKeys";
import { getAttendance } from "../api/attendance.api";

export default function useAttendance(activityId) {
  return useQuery({
    queryKey: [...QUERY_KEYS.ATTENDANCE, activityId],
    queryFn: () => getAttendance(activityId),
    enabled: !!activityId,
  });
}