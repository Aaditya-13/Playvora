import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useNavigate } from "react-router";
import QUERY_KEYS from "../../../constants/queryKeys";
import { completeActivity } from "../api/activity.api";
import ROUTES from "../../../constants/routes";

export default function useCompleteActivity(activityId) {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  return useMutation({
    mutationFn: () => completeActivity(activityId),

    onSuccess: async () => {
      toast.success("Activity marked as completed.");

      await queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.DASHBOARD,
      });

      await queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.NEARBY_ACTIVITIES,
      });

      await queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.ACTIVITY_DETAILS,
      });
      navigate(ROUTES.DASHBOARD);
    },

    onError: (error) => {
      toast.error(
        error?.response?.data?.message ??
        "Failed to complete activity."
      );
    },
  });
}