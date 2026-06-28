import { useQuery } from "@tanstack/react-query";

import QUERY_KEYS from "../../../constants/queryKeys";
import useAuthStore from "../../../store/authStore";

import {
  getMyCreatedActivities,
  getMyJoinedActivities,
} from "../api/dashboard.api";

export default function useDashboard() {
  const { user } = useAuthStore();

  return useQuery({
    queryKey: QUERY_KEYS.DASHBOARD,

    queryFn: async () => {
      const [hostingResponse, joinedResponse] = await Promise.all([
        getMyCreatedActivities(),
        getMyJoinedActivities(),
      ]);

      const hosting = hostingResponse.data;

      const joined = joinedResponse.data.filter(
        (activity) => activity.organizer !== user?._id
      );

      const completed = [];

      return {
        hosting,
        joined,
        completed,
      };
    },
  });
}