import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import QUERY_KEYS from "../../../constants/queryKeys";
import { updateActivity } from "../api/activity.api";

export default function useUpdateActivity(activityId) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload) =>
      updateActivity(activityId, payload),

    onSuccess: () => {
      toast.success("Activity updated successfully.");

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
          "Failed to update activity."
      );
    },
  });
}