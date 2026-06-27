import { create } from "zustand";

const useAuthStore = create((set) => ({
  isInitialized: false,
  isBootstrapping: false,

  setInitialized: (value) =>
    set({
      isInitialized: value,
    }),

  setBootstrapping: (value) =>
    set({
      isBootstrapping: value,
    }),

  reset: () =>
    set({
      isInitialized: false,
      isBootstrapping: false,
    }),
}));

export default useAuthStore;