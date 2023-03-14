import QueryResolver from './queryResolver';
import MutationResolver from './mutationResolver';
import typeDefs from './typeDefs';

import { ApolloServer, BaseContext } from '@apollo/server';
import { ApolloServerErrorCode } from '@apollo/server/errors';

const server = new ApolloServer<BaseContext>({
  typeDefs,
  resolvers: {
    Query: QueryResolver,
    Mutation: MutationResolver,
  },
  formatError: (formattedError) => {
    if (
      formattedError?.extensions?.code ===
      ApolloServerErrorCode.GRAPHQL_VALIDATION_FAILED
    ) {
      return {
        ...formattedError,
        message: "Your query doesn't match the schema. Try double-checking it!",
      };
    }
    return formattedError;
  },
});

export default server;
