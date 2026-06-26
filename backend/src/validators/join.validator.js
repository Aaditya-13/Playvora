import { z } from "zod";

export const joinActivitySchema = z.object({
    message: z
        .string()
        .trim()
        .max(200)
        .optional(),
});