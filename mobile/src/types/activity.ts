export interface User {
  _id: string;
  username: string;
  fullName: string;
  avatar?: string;
  reliabilityScore?: number;
  isVerified?: boolean;
}

export interface Activity {
  _id: string;
  title: string;
  description: string;
  sport: string;
  organizer: User;
  participants: User[];
  groundName: string;
  address: string;
  location: {
    type: 'Point';
    coordinates: [number, number]; // [lng, lat]
  };
  scheduledAt: string;
  maxPlayers: number;
  currentPlayers: number;
  skillLevel: 'beginner' | 'intermediate' | 'advanced';
  venueType: 'indoor' | 'outdoor' | 'both';
  joinPolicy: 'open' | 'approval';
  genderPreference: 'any' | 'male' | 'female';
  cost: {
    amount: number;
    currency: string;
    description: string;
  };
  notes: string;
  visibilityRadius: number;
  status: 'open' | 'full' | 'in-progress' | 'completed' | 'cancelled';
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
}
