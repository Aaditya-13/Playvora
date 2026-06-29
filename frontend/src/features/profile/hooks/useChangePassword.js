import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

import { changePassword } from "../api/profile.api";

export default function useChangePassword() {
  return useMutation({
    mutationFn: changePassword,

    onSuccess: () => {
      toast.success("Password updated successfully.");
    },

    onError: (error) => {
      toast.error(
        error?.response?.data?.message ||
          "Failed to update password."
      );
    },
  });
}