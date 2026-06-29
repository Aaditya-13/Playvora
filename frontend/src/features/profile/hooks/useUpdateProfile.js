import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import QUERY_KEYS from "../../../constants/queryKeys";
import { updateProfile } from "../api/profile.api";

export default function useUpdateProfile() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateProfile,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.BOOTSTRAP,
      });

      toast.success("Profile updated successfully.");
    },

    onError: (error) => {
      toast.error(
        error?.response?.data?.message ||
          "Failed to update profile."
      );
    },
  });
}