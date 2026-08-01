export interface Activity {
  _id: string;
  title: string;
  sport: string;
  skillLevel: "Beginner" | "Intermediate" | "Advanced";
  cost: {
    amount: number;
    description: string;
  };
  groundName: string;
  location: {
    coordinates: [number, number]; // [longitude, latitude]
  };
  scheduledAt: string;
  currentPlayers: number;
  maxPlayers: number;
}

export const mockActivities: Activity[] = [
  {
    _id: "act-001",
    title: "Saturday Morning Turf Football",
    sport: "Football",
    skillLevel: "Intermediate",
    cost: { amount: 200, description: "per person" },
    groundName: "Astro Park, Bandra",
    location: { coordinates: [72.8277, 19.0531] },
    scheduledAt: "2026-08-05T07:00:00Z",
    currentPlayers: 10,
    maxPlayers: 14,
  },
  {
    _id: "act-002",
    title: "Casual Badminton Doubles",
    sport: "Badminton",
    skillLevel: "Beginner",
    cost: { amount: 150, description: "court split" },
    groundName: "Andheri Sports Complex",
    location: { coordinates: [72.8361, 19.1308] },
    scheduledAt: "2026-08-05T18:00:00Z",
    currentPlayers: 2,
    maxPlayers: 4,
  },
  {
    _id: "act-003",
    title: "Competitive 5v5 Basketball",
    sport: "Basketball",
    skillLevel: "Advanced",
    cost: { amount: 0, description: "free entry" },
    groundName: "YMCA Colaba",
    location: { coordinates: [72.8306, 18.9189] },
    scheduledAt: "2026-08-06T19:30:00Z",
    currentPlayers: 8,
    maxPlayers: 10,
  },
  {
    _id: "act-004",
    title: "Sunday Tennis Singles",
    sport: "Tennis",
    skillLevel: "Intermediate",
    cost: { amount: 500, description: "per person" },
    groundName: "Khar Gymkhana",
    location: { coordinates: [72.8329, 19.0689] },
    scheduledAt: "2026-08-07T08:00:00Z",
    currentPlayers: 1,
    maxPlayers: 2,
  },
];
