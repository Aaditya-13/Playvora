import { z } from "zod";

export const deleteAccountSchema = z.object({
  password: z
    .string()
    .min(8, "Password is required."),
});