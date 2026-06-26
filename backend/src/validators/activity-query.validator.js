import { z } from "zod";

import {
    SPORTS,
    SKILL_LEVELS,
} from "../constants/activity.constants.js";

export const nearbyActivitiesSchema = z.object({

    lat: z.coerce
        .number()
        .min(-90)
        .max(90),

    lng: z.coerce
        .number()
        .min(-180)
        .max(180),

    radius: z.coerce
        .number()
        .min(500)
        .max(50000)
        .default(5000),

    sport: z
        .enum(SPORTS)
        .optional(),

    skillLevel: z
        .enum(SKILL_LEVELS)
        .optional(),

    page: z.coerce
        .number()
        .min(1)
        .default(1),

    limit: z.coerce
        .number()
        .min(1)
        .max(20)
        .default(10),

});