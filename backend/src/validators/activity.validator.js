import { z } from "zod";

import {
    SPORTS,
    SKILL_LEVELS,
    VENUE_TYPES,
    JOIN_POLICIES,
    GENDER_PREFERENCES,
} from "../constants/activity.constants.js";

export const createActivitySchema = z.object({
    title: z
        .string()
        .trim()
        .min(3)
        .max(100),

    description: z
        .string()
        .trim()
        .max(500)
        .optional(),

    sport: z.enum(SPORTS),

    groundName: z
        .string()
        .trim()
        .min(2)
        .max(100),

    address: z
        .string()
        .trim()
        .min(5)
        .max(300),

    longitude: z
        .number()
        .min(-180)
        .max(180),

    latitude: z
        .number()
        .min(-90)
        .max(90),

    scheduledAt: z.coerce.date(),

    maxPlayers: z
        .number()
        .int()
        .min(2)
        .max(100),

    skillLevel: z.enum(SKILL_LEVELS),

    venueType: z.enum(VENUE_TYPES),

    joinPolicy: z.enum(JOIN_POLICIES),

    genderPreference: z.enum(GENDER_PREFERENCES),

    cost: z.object({
        amount: z.number().min(0).default(0),

        currency: z.string().default("INR"),

        description: z.string().max(100).optional(),
    }),

    notes: z
        .string()
        .max(500)
        .optional(),

    visibilityRadius: z
        .number()
        .min(1000)
        .max(50000),
});



export const updateActivitySchema =
    createActivitySchema.partial();