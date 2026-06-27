import { z } from "zod";

const registerSchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(3, "Full name is required"),

  username: z
    .string()
    .trim()
    .min(3, "Username must be at least 3 characters")
    .max(20),

  email: z
    .email("Enter a valid email address"),

  password: z
    .string()
    .min(8, "Password must be at least 8 characters"),
});

export default registerSchema;