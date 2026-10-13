import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { User } from '@dream-more/shared';

interface AuthState {
  user: User | null;
  token: string | null;
  setUser: (user: User | null) => void;
  setToken: (token: string | null) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      setUser: (user) => set({ user }),
      setToken: (token) => set({ token }),
      logout: () => {
        set({ user: null, token: null });
        if (typeof window !== 'undefined') {
          localStorage.removeItem('dream_more_auth');
        }
      },
    }),
    {
      name: 'dream_more_auth',
    }
  )
);
