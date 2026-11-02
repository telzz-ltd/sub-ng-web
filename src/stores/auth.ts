
import { create } from "zustand";
import { persist, createJSONStorage, type StateStorage } from "zustand/middleware";

const noopStorage: StateStorage = {
  getItem: () => null,
  setItem: () => {},
  removeItem: () => {},
};

const getStorage = (): StateStorage =>
  typeof window === "undefined" ? noopStorage : window.localStorage;

export type User = {
  id: number;
  name: string;
  email: string;
  emailVerified: boolean;
  createdAt: string;
  updatedAt: string;
};

export type AuthSession = {
  token: string;
  user: User;
};

type AuthStore = {
  session: AuthSession | null;
  hydrated: boolean;

  setSession: (session: AuthSession) => void;
  setUser: (user: User) => void;
  clearSession: () => void;
};

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      session: null,
      hydrated: false,

      setSession: (session) => set({ session }),

      setUser: (user) =>
        set((state) => ({
          session: state.session
            ? { ...state.session, user }
            : null,
        })),

      clearSession: () => set({ session: null }),
    }),
    {
      name: "subsng.auth",
      storage: createJSONStorage(getStorage),
      partialize: (state) => ({
        session: state.session,
      })
    },
  ),
);

export const getAuthSession = () =>
  useAuthStore.getState().session;

export const getAuthToken = () =>
  useAuthStore.getState().session?.token ?? null;
