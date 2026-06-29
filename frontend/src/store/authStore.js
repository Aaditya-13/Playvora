import { create } from "zustand";

const useAuthStore = create((set) => ({
  user: null,

  isInitialized: false,
  isBootstrapping: false,

  setUser: (user) =>
    set({
      user,
    }),

  clearUser: () =>
    set({
      user: null,
    }),

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
      user: null,
      isInitialized: false,
      isBootstrapping: false,
    }),
}));

export default useAuthStore;