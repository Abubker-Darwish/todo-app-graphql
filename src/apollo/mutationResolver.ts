import { taskMutationsResolver } from '@/modules/Task';
import { userMutationsResolver } from '@/modules/User';
import { AuthenticationMutation } from '@/modules/Authentication';

const resolvers = {
  ...taskMutationsResolver,
  ...userMutationsResolver,
  ...AuthenticationMutation,
};

export default resolvers;
