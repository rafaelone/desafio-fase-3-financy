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
  isAuthenticated: boolean;
  signup: (data: RegisterInput) => Promise<boolean>;
  login: (data: LoginInput) => Promise<boolean>;
  logout: () => void;
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      login: async (loginData: LoginInput) => {
        try {
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
            const { user, token } = data.login;
            set({
              user: {
                id: user.id,
                fullName: user.fullName,
                email: user.email,
                createdAt: user.createdAt,
                updatedAt: user.updatedAt,
              },
              token,
              isAuthenticated: true,
            });
            return true;
          }
          return false;
        } catch (error) {
          console.log('Erro ao fazer login');
          throw error;
        }
      },
      signup: async (registerData: RegisterInput) => {
        try {
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
          console.log('DATAAAAA', data);
          if (data?.register) {
            const { token, user } = data.register;
            set({
              user: {
                id: user.id,
                fullName: user.fullName,
                email: user.email,
                createdAt: user.createdAt,
                updatedAt: user.updatedAt,
              },
              token,
              isAuthenticated: true,
            });
            return true;
          }
          return false;
        } catch (error) {
          console.log('Erro ao fazer o cadastro');
          throw error;
        }
      },
      logout: () => {
        set({
          user: null,
          token: null,
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
