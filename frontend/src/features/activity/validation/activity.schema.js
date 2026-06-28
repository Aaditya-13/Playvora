import { z } from "zod";

export const createActivitySchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  sport: z.string().min(1, "Please select a sport"),
  groundName: z.string().min(2, "Venue name is required"),
  address: z.string().min(5, "Full address is required"),
  mapLink: z.string().url("Please enter a valid URL").optional().or(z.string().length(0)),
  latitude: z.number({ required_error: "Please select a location" }),
  longitude: z.number({ required_error: "Please select a location" }),
  scheduledAt: z.string().refine((val) => new Date(val) > new Date(), {
    message: "Activity must be scheduled in the future",
  }),
  maxPlayers: z.coerce.number().min(2, "Must have at least 2 players").max(50, "Limit is 50 players"),
  skillLevel: z.enum(["beginner", "intermediate", "advanced", "any"]).default("any"),
  venueType: z.enum(["indoor", "outdoor"]).default("outdoor"),
  joinPolicy: z.enum(["open", "approval"]).default("approval"),
  genderPreference: z.enum(["any", "men", "women"]).default("any"),
  cost: z.object({
    amount: z.coerce.number().min(0, "Cost cannot be negative"),
    currency: z.string().default("INR"),
    description: z.string().optional(),
  }),
  notes: z.string().optional(),
});