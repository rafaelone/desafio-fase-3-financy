import { GraphQLError } from 'graphql';
import type { MiddlewareFn } from 'type-graphql';
import type { GraphqlContext } from '../graphql/context';

export const IsAuth: MiddlewareFn<GraphqlContext> = async (
  { context },
  next,
) => {
  if (!context.user) {
    throw new GraphQLError('Usuário não autenticado!', {
      extensions: {
        code: 'UNAUTHENTICATED',
      },
    });
  }

  return next();
};
