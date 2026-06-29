import { z } from "zod";

export const profileSchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(3, "Full name must be at least 3 characters.")
    .max(50),

  username: z
    .string()
    .trim()
    .min(3)
    .max(30),

  bio: z
    .string()
    .max(200)
    .optional(),

  favouriteSports: z
    .array(z.string())
    .min(1, "Select at least one sport."),
});