import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { LoginInput, RegisterInput, User } from '@/types';
import { apolloClient } from '@/lib/apollo';
import { LOGIN } from '@/lib/graphql/mutations/login';
import { REGISTER } from '@/lib/graphql/mutations/register';

type RegisterMutationData = {
  register: {
    token: string;
    refreshToken: string;
    user: User;
  };
};

type LoginMutationData = {
  login: {
    token: string;
    refreshToken: string;
    user: User;
  };
};

type AuthState = {
  user: User | null;
  token: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
  setToken: (token: string) => void;
  signup: (data: RegisterInput) => Promise<boolean>;
  login: (data: LoginInput) => Promise<boolean>;
  logout: () => void;
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      refreshToken: null,
      isAuthenticated: false,
      setToken: (token: string) => set({ token }),
      login: async (loginData: LoginInput) => {
        const { data } = await apolloClient.mutate<
          LoginMutationData,
          { data: LoginInput }
        >({
          mutation: LOGIN,
          variables: {
            data: {
              email: loginData.email,
              password: loginData.password,
            },
          },
        });

        if (data?.login) {
          const { user, token, refreshToken } = data.login;
          set({
            user: {
              id: user.id,
              fullName: user.fullName,
              email: user.email,
              createdAt: user.createdAt,
              updatedAt: user.updatedAt,
            },
            token,
            refreshToken,
            isAuthenticated: true,
          });
          return true;
        }
        return false;
      },
      signup: async (registerData: RegisterInput) => {
        const { data } = await apolloClient.mutate<
          RegisterMutationData,
          { data: RegisterInput }
        >({
          mutation: REGISTER,
          variables: {
            data: {
              fullName: registerData.fullName,
              email: registerData.email,
              password: registerData.password,
            },
          },
        });
        
        if (data?.register) {
          const { token, refreshToken, user } = data.register;
          set({
            user: {
              id: user.id,
              fullName: user.fullName,
              email: user.email,
              createdAt: user.createdAt,
              updatedAt: user.updatedAt,
            },
            token,
            refreshToken,
            isAuthenticated: true,
          });
          return true;
        }
        return false;
      },
      logout: () => {
        set({
          user: null,
          token: null,
          refreshToken: null,
          isAuthenticated: false,
        });
        apolloClient.clearStore();
      },
    }),
    {
      name: 'auth-storage',
    },
  ),
);
