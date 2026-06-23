import { create } from "zustand";

import { User } from "@/types/user";
import api from "@/lib/api";

type AuthState = {
  token: string | null;
  user: User | null;

  setToken: (token: string) => void;
  setUser: (user: User) => void;

  initialize: () => Promise<void>;

  logout: () => void;
};

export const useAuthStore = create<AuthState>((set) => ({
  token: null,

  user: null,

  setToken: (token) => set({ token }),

  setUser: (user) => set({ user }),

  initialize: async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) return;

      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      const { data } = await api.get("/auth/me");

      set({
        token,
        user: data.user,
      });
    } catch {
      localStorage.removeItem("token");

      set({
        token: null,
        user: null,
      });
    }
  },

  logout: () => {
    localStorage.removeItem("token");

    delete api.defaults.headers.common["Authorization"];

    set({
      token: null,
      user: null,
    });
  },
}));
