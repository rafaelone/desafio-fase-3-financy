import { useAuthStore } from '@/stores/auth';
import {
  ApolloClient,
  HttpLink,
  ApolloLink,
  InMemoryCache,
  Observable,
} from '@apollo/client';
import { SetContextLink } from '@apollo/client/link/context';
import { REFRESH_TOKEN } from './graphql/mutations/refresh-token';

const httpLink = new HttpLink({
  uri: import.meta.env.VITE_BACKEND_URL,
});

const authLink = new SetContextLink((prevContext) => {
  const token = useAuthStore.getState().token;
  return {
    headers: {
      ...prevContext.headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

let isRefreshing = false;
let pendingRequests: Array<() => void> = [];

const resolvePendingRequests = () => {
  pendingRequests.forEach((callback) => callback());
  pendingRequests = [];
};

const errorLink = new ApolloLink((operation, forward) => {
  return new Observable((observer) => {
    const subscription = forward(operation).subscribe({
      next: (result) => {
        if (result.errors) {
          console.log('Erros GraphQL detectados:', result.errors);
          
          const hasAuthError = result.errors.some(
            (err) =>
              err.message === 'Usuário não autenticado!' ||
              err.extensions?.code === 'UNAUTHENTICATED'
          );

          if (hasAuthError) {
            console.log('Erro de autenticação detectado!');
            const refreshToken = useAuthStore.getState().refreshToken;

            if (!refreshToken) {
              console.log('Sem refresh token, fazendo logout...');
              useAuthStore.getState().logout();
              observer.error(result.errors[0]);
              subscription.unsubscribe();
              return;
            }

            if (!isRefreshing) {
              isRefreshing = true;
              console.log('Iniciando refresh do token...');

              apolloClient
                .mutate<{
                  refreshToken: {
                    token: string;
                    refreshToken: string;
                    user: {
                      id: string;
                      fullName: string;
                      email: string;
                      createdAt: string;
                      updatedAt: string;
                    };
                  };
                }>({
                  mutation: REFRESH_TOKEN,
                  variables: { refreshToken },
                })
                .then((response) => {
                  if (!response.data) {
                    throw new Error('Resposta inválida');
                  }

                  const {
                    token,
                    refreshToken: newRefreshToken,
                    user,
                  } = response.data.refreshToken;

                  console.log('Token renovado com sucesso!');
                  useAuthStore.setState({
                    token,
                    refreshToken: newRefreshToken,
                    user,
                    isAuthenticated: true,
                  });

                  const oldHeaders = operation.getContext().headers;
                  operation.setContext({
                    headers: {
                      ...oldHeaders,
                      authorization: `Bearer ${token}`,
                    },
                  });

                  resolvePendingRequests();

                  forward(operation).subscribe({
                    next: observer.next.bind(observer),
                    error: observer.error.bind(observer),
                    complete: observer.complete.bind(observer),
                  });
                })
                .catch((err) => {
                  console.log('Erro ao renovar token:', err);
                  pendingRequests = [];
                  useAuthStore.getState().logout();
                  observer.error(err);
                })
                .finally(() => {
                  isRefreshing = false;
                });

              subscription.unsubscribe();
              return;
            } else {
              console.log('Refresh já em andamento, adicionando à fila...');
              pendingRequests.push(() => {
                const token = useAuthStore.getState().token;
                const oldHeaders = operation.getContext().headers;
                operation.setContext({
                  headers: {
                    ...oldHeaders,
                    authorization: `Bearer ${token}`,
                  },
                });

                forward(operation).subscribe({
                  next: observer.next.bind(observer),
                  error: observer.error.bind(observer),
                  complete: observer.complete.bind(observer),
                });
              });
              subscription.unsubscribe();
              return;
            }
          }
        }
        
        observer.next(result);
      },
      error: (networkError) => {
        console.log('Erro de rede:', networkError);
        observer.error(networkError);
      },
      complete: observer.complete.bind(observer),
    });

    return () => subscription.unsubscribe();
  });
});

export const apolloClient = new ApolloClient({
  link: ApolloLink.from([errorLink, authLink, httpLink]),
  cache: new InMemoryCache(),
});
