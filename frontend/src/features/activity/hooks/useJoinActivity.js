import { useMutation, useQueryClient } from "@tanstack/react-query";
import QUERY_KEYS from "../../../constants/queryKeys.js";
import { joinActivity } from "../api/activity.api.js";
import { toast } from "sonner"; 

export default function useJoinActivity(activityId) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => joinActivity(activityId),
    onSuccess: () => {
      toast.success("Join request sent!");
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.ACTIVITY_DETAILS || "activityDetails", activityId],
      });
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message || "Failed to send join request.");
    },
  });
}