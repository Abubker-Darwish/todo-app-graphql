import { userQueriesResolver, userMutationsResolver } from './User.resolvers';
import { readFileSync } from 'fs';

const userTypeDef = readFileSync(
  require.resolve('../../schema/User.schema.graphql')
).toString('utf-8');

export { userTypeDef, userQueriesResolver, userMutationsResolver };
