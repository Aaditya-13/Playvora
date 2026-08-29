import { create } from "zustand";

interface FilterState {
  searchQuery: string;
  selectedSport: string;
  visibilityRadius: number; // in meters
  page: number;
  setSearchQuery: (query: string) => void;
  setSelectedSport: (sport: string) => void;
  setVisibilityRadius: (radius: number) => void;
  setPage: (page: number) => void;
}

export const useFilterStore = create<FilterState>((set) => ({
  searchQuery: "",
  selectedSport: "All",
  visibilityRadius: 5000, // default 5km
  page: 1,
  setSearchQuery: (query) => set({ searchQuery: query, page: 1 }), // reset to page 1 on search
  setSelectedSport: (sport) => set({ selectedSport: sport, page: 1 }), // reset to page 1 on filter
  setVisibilityRadius: (radius) => set({ visibilityRadius: radius, page: 1 }),
  setPage: (page) => set({ page }),
}));
