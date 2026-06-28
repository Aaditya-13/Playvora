import { z } from "zod";

export const createActivitySchema = z.object({
  title: z
    .string()
    .trim()
    .min(3, "Title must be at least 3 characters")
    .max(100, "Title cannot exceed 100 characters"),

  description: z
    .string()
    .trim()
    .min(10, "Description must be at least 10 characters")
    .max(500, "Description cannot exceed 500 characters"),

  sport: z
    .string()
    .min(1, "Please select a sport"),

  groundName: z
    .string()
    .trim()
    .min(2, "Ground name is required")
    .max(100, "Ground name cannot exceed 100 characters"),

  address: z
    .string()
    .trim()
    .min(5, "Full address is required")
    .max(300, "Address cannot exceed 300 characters"),

  latitude: z.coerce
    .number()
    .min(-90)
    .max(90),

  longitude: z.coerce
    .number()
    .min(-180)
    .max(180),

  dateInput: z
    .string()
    .min(1, "Please select a date"),

  timeInput: z
    .string()
    .min(1, "Please select a time"),

  maxPlayers: z.coerce
    .number()
    .min(2, "Minimum 2 players required")
    .max(50, "Maximum 50 players allowed"),

  skillLevel: z.enum([
    "beginner",
    "intermediate",
    "advanced",
  ]),

  venueType: z.enum([
    "indoor",
    "outdoor",
  ]),

  joinPolicy: z.enum([
    "open",
    "approval",
  ]),

  genderPreference: z.enum([
    "any",
    "male",
    "female",
  ]),

  visibilityRadius: z.coerce
    .number()
    .min(1000, "Minimum radius is 1 km")
    .max(50000, "Maximum radius is 50 km"),


  cost: z.object({
    amount: z.coerce
      .number()
      .min(0, "Cost cannot be negative"),

    currency: z.string().default("INR"),

    description: z.string().default("Per player"),
  }),

  notes: z
    .string()
    .max(500, "Notes cannot exceed 500 characters")
    .optional(),
});