import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import QUERY_KEYS from "../../../constants/queryKeys";

import { approveRequest } from "../api/joinRequest.api";

export default function useApproveRequest() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: approveRequest,

    onSuccess: () => {
      toast.success("Request approved.");

      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.JOIN_REQUESTS,
      });

      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.ACTIVITY_DETAILS,
      });
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.DASHBOARD,
      });
    },

    onError: (error) => {
      toast.error(
        error?.response?.data?.message ||
        "Failed to approve request."
      );
    },
  });
}