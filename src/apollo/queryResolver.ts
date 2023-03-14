import { taskQueriesResolver } from '@/modules/Task';
import { userQueriesResolver } from '@/modules/User';
import { AuthenticationQuery } from '@/modules/Authentication';

const resolvers = {
  ...taskQueriesResolver,
  ...userQueriesResolver,
  ...AuthenticationQuery,
};

export default resolvers;
