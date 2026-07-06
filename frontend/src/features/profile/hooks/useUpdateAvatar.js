import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import QUERY_KEYS from "../../../constants/queryKeys";
import { updateAvatar } from "../api/profile.api";

export default function useUpdateAvatar() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateAvatar,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.BOOTSTRAP,
      });
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.PROFILE,
      });
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.DASHBOARD,
      });
    },

    onError: (error) => {
      toast.error(
        error?.response?.data?.message ||
        "Failed to update avatar."
      );
    },
  });
}