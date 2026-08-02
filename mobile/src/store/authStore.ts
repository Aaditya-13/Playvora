import { create } from "zustand";

interface User {
  id: string;
  name: string;
  email: string;
}

interface AuthState {
  user: User | null;
  isInitialized: boolean;
  isBootstrapping: boolean;
  setUser: (user: User | null) => void;
  clearUser: () => void;
  setInitialized: (value: boolean) => void;
  setBootstrapping: (value: boolean) => void;
  reset: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isInitialized: false,
  isBootstrapping: true,

  setUser: (user) => set({ user }),
  clearUser: () => set({ user: null }),
  setInitialized: (value) => set({ isInitialized: value }),
  setBootstrapping: (value) => set({ isBootstrapping: value }),
  reset: () =>
    set({
      user: null,
      isInitialized: false,
      isBootstrapping: false,
    }),
}));
