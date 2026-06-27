import { useMutation } from "@tanstack/react-query";

import { login } from "../api/auth.api";

export default function useLogin() {
  return useMutation({
    mutationFn: login,
  });
}