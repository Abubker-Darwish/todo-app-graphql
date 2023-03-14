import { taskQueriesResolver, taskMutationsResolver } from './Task.resolvers';
import { readFileSync } from 'fs';

const taskTypeDef = readFileSync(
  require.resolve('../../schema/Task.schema.graphql')
).toString('utf-8');

export { taskTypeDef, taskQueriesResolver, taskMutationsResolver };
