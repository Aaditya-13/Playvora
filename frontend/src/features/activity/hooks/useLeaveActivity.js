import { useMutation, useQueryClient } from "@tanstack/react-query";
import QUERY_KEYS from "../../../constants/queryKeys.js";
import { leaveActivity } from "../api/activity.api.js";
import { toast } from "sonner";

export default function useLeaveActivity(activityId) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => leaveActivity(activityId),
    onSuccess: () => {
      toast.success("You have left the activity.");
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.ACTIVITY_DETAILS || "activityDetails", activityId],
      });
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message || "Failed to leave activity.");
    },
  });
}