import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import QUERY_KEYS from "../../../constants/queryKeys";

import { rejectRequest } from "../api/joinRequest.api";

export default function useRejectRequest() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: rejectRequest,

    onSuccess: () => {
      toast.success("Request rejected.");

      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.JOIN_REQUESTS,
      });
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.ACTIVITY_DETAILS,
      });
    },

    onError: (error) => {
      toast.error(
        error?.response?.data?.message ||
        "Failed to reject request."
      );
    },
  });
}