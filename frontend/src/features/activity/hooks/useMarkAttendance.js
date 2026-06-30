import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import QUERY_KEYS from "../../../constants/queryKeys";
import { markAttendance } from "../api/attendance.api";

export default function useMarkAttendance(activityId) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (attendance) =>
      markAttendance(activityId, attendance),

    onSuccess: () => {
      toast.success("Attendance saved.");

      queryClient.invalidateQueries({
        queryKey: [...QUERY_KEYS.ATTENDANCE, activityId],
      });

      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.DASHBOARD,
      });

      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.ACTIVITY_DETAILS,
      });
    },

    onError: (error) => {
      toast.error(
        error?.response?.data?.message ??
          "Failed to save attendance."
      );
    },
  });
}