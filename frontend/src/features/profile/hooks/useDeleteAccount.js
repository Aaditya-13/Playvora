import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { toast } from "sonner";

import { deleteAccount } from "../api/profile.api";

import useAuthStore from "../../../store/authStore";

export default function useDeleteAccount() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { reset } = useAuthStore();

  return useMutation({
    mutationFn: deleteAccount,

    onSuccess: () => {
      reset();

      queryClient.clear();

      toast.success("Account deleted successfully.");

      navigate("/register", {
        replace: true,
      });
    },

    onError: (error) => {
      toast.error(
        error?.response?.data?.message ||
          "Failed to delete account."
      );
    },
  });
}