import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";

type AuthState = {
  accessToken?: string;
  userEmail?: string;
};

type Actions = {
  setToken: (token?: string) => void;
  setUserEmail: (email?: string) => void;
  signOut: () => void;
};

export const useAuthStore = create<AuthState & Actions>()(
  persist(
    (set) => ({
      accessToken: undefined,
      userEmail: undefined,
      setToken: (token) => set({ accessToken: token }),
      setUserEmail: (email) => set({ userEmail: email }),
      signOut: () => set({ accessToken: undefined, userEmail: undefined }),
    }),
    { name: "pay-tracker-auth", storage: createJSONStorage(() => AsyncStorage) }
  )
);
