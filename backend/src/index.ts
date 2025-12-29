import 'reflect-metadata';
import 'dotenv/config';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@as-integrations/express5';
import express from 'express';
import { buildSchema } from 'type-graphql';

import { buildContext } from './graphql/context';
import { AuthResolver } from './resolvers/auth.resolver';
import { TransactionResolver } from './resolvers/transaction.resolver';
import { CategoryResolver } from './resolvers/category.resolver';
import { UserResolver } from './resolvers/user.resolver';


async function bootstrap() {
  const app = express();

  const schema = await buildSchema({
    resolvers: [AuthResolver, TransactionResolver, CategoryResolver, UserResolver],
    validate: false,
    emitSchemaFile: './schema.graphql',
  });

  const server = new ApolloServer({
    schema,
  });

  await server.start();

  app.use(
    '/graphql',
    express.json(),
    expressMiddleware(server, { context: buildContext }),
  );

  app.listen(
    {
      port: 4000,
    },
    () => {
      console.log(`🚀 Server ready on port 4000`);
    },
  );
}

bootstrap()
