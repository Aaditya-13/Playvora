import { useMutation } from "@tanstack/react-query";

import { guestLogin } from "../api/auth.api";

export default function useGuestLogin() {
  return useMutation({
    mutationFn: guestLogin,
  });
}