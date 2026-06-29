import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { toast } from "sonner";

import { logout } from "../api/profile.api";

import useAuthStore from "../../../store/authStore";

export default function useLogout() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { reset } = useAuthStore();

  return useMutation({
    mutationFn: logout,

    onSuccess: () => {
      reset();

      queryClient.clear();

      toast.success("Logged out successfully.");

      navigate("/login", {
        replace: true,
      });
    },

    onError: () => {
      toast.error("Failed to logout.");
    },
  });
}