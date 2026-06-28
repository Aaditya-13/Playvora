import { create } from "zustand";

const useFilterStore = create((set) => ({
  searchQuery: "",
  selectedSport: "All",
  setSearchQuery: (query) => set({ searchQuery: query }),
  setSelectedSport: (sport) => set({ selectedSport: sport }),
}));

export default useFilterStore;