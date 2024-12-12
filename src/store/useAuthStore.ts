import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface Admin {
  id: string;
  username: string;
}

interface AuthState {
  token: string | null;
  admin: Admin | null;
  isAuthenticated: boolean;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
  updateProfile: (data: {
    username?: string;
    currentPassword: string;
    newPassword?: string;
  }) => Promise<void>;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      token: null,
      admin: null,
      isAuthenticated: false,

      login: async (username: string, password: string) => {
        try {
          const response = await fetch('http://localhost:3001/api/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password }),
          });

          if (!response.ok) {
            throw new Error('Invalid credentials');
          }

          const data = await response.json();
          set({
            token: data.token,
            admin: data.admin,
            isAuthenticated: true,
          });
        } catch (error) {
          throw new Error('Login failed');
        }
      },

      logout: () => {
        set({
          token: null,
          admin: null,
          isAuthenticated: false,
        });
      },

      updateProfile: async (data) => {
        try {
          const response = await fetch('http://localhost:3001/api/auth/profile', {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${useAuthStore.getState().token}`,
            },
            body: JSON.stringify(data),
          });

          if (!response.ok) {
            throw new Error('Failed to update profile');
          }

          if (data.username) {
            set((state) => ({
              admin: state.admin ? { ...state.admin, username: data.username } : null,
            }));
          }
        } catch (error) {
          throw new Error('Profile update failed');
        }
      },
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({
        token: state.token,
        admin: state.admin,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);