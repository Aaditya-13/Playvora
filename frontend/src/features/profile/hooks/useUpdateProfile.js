import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import QUERY_KEYS from "../../../constants/queryKeys";
import { updateProfile } from "../api/profile.api";
import useAuthStore from "../../../store/authStore";

export default function useUpdateProfile() {
  const queryClient = useQueryClient();
  const { setUser } = useAuthStore();
  return useMutation({
    mutationFn: updateProfile,

    onSuccess: (data) => {
      setUser(data.data);
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.CURRENT_USER,
      })
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
        "Failed to update profile."
      );
    },
  });
}