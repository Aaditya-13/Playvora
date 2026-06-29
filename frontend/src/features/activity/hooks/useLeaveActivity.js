import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import QUERY_KEYS from "../../../constants/queryKeys";
import { leaveActivity } from "../api/activity.api";

export default function useLeaveActivity(activityId) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => leaveActivity(activityId),

    onSuccess: () => {
      toast.success("You have left the activity.");

      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.DASHBOARD,
      });

      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.NEARBY_ACTIVITIES,
      });

      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.SEARCH,
      });

      queryClient.invalidateQueries({
        queryKey: ["activity", activityId],
      });
    },

    onError: (error) => {
      toast.error(
        error?.response?.data?.message ??
          "Failed to leave activity."
      );
    },
  });
}