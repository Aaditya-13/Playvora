import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useNavigate } from "react-router";

import QUERY_KEYS from "../../../constants/queryKeys";
import ROUTES from "../../../constants/routes";

import { cancelActivity } from "../api/activity.api";

export default function useCancelActivity(activityId) {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: () => cancelActivity(activityId),

    onSuccess: () => {
      toast.success("Activity cancelled successfully.");

      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.DASHBOARD,
      });

      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.NEARBY_ACTIVITIES,
      });

      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.ACTIVITY_DETAILS,
      });

      navigate(ROUTES.DASHBOARD);
    },

    onError: (error) => {
      toast.error(
        error?.response?.data?.message ??
          "Failed to cancel activity."
      );
    },
  });
}