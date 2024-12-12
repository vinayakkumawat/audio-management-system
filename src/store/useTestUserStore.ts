import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { TestUser } from '../types/auth';
import { testUserApi } from '../api/testUser';


interface TestUserState {

    user: Omit<TestUser, "password"> | null;
  
    isAuthenticated: boolean;
  
    login: (username: string, password: string) => Promise<void>;
  
    register: (username: string, password: string) => Promise<void>;
  
    logout: () => void;
}

export const useTestUserStore = create<TestUserState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,

      login: async (username: string, password: string) => {
        try {
          const data = await testUserApi.login({ username, password });
          set({
            user: data.user,
            isAuthenticated: true,
          });
        } catch (error) {
          throw new Error('Login failed');
        }
      },

      register: async (username: string, password: string) => {
        try {
          const data = await testUserApi.register({ username, password });
          set({
            user: data.user,
            isAuthenticated: true,
          });
        } catch (error) {
          throw new Error('Registration failed');
        }
      },

      logout: () => {
        set({
          user: null,
          isAuthenticated: false,
        });
      },
    }),
    {
      name: 'test-user-storage',
    }
  )
);