import { create } from "zustand";

interface FilterState {
  searchQuery: string;
  selectedSport: string;
  visibilityRadius: number; // in meters
  setSearchQuery: (query: string) => void;
  setSelectedSport: (sport: string) => void;
  setVisibilityRadius: (radius: number) => void;
}

export const useFilterStore = create<FilterState>((set) => ({
  searchQuery: "",
  selectedSport: "All",
  visibilityRadius: 5000, // default 5km
  setSearchQuery: (query) => set({ searchQuery: query }),
  setSelectedSport: (sport) => set({ selectedSport: sport }),
  setVisibilityRadius: (radius) => set({ visibilityRadius: radius }),
}));
