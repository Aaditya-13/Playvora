import { z } from "zod";

export const updateProfileSchema = z.object({

    fullName: z
        .string()
        .trim()
        .min(1)
        .max(50)
        .optional(),

    bio: z
        .string()
        .trim()
        .max(300)
        .optional(),

});

export const updateFavouriteSportsSchema = z.object({

    favouriteSports: z
        .array(z.string())
        .min(1)
        .max(10),

});