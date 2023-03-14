import { handleGraphErr } from '@/services/global';
import { GlobalFiltersType, GraphqlContext } from '@/types/globals';
import {
  userCreate,
  userDelete,
  userLoad,
  UserPayload,
  usersLoad,
  userUpdate,
} from './User.controller';

const userQueriesResolver = {
  users: async (
    _: unknown,
    args: { filter: GlobalFiltersType },
    ctx: GraphqlContext
  ) => {
    if (!ctx.user) throw handleGraphErr('User token missed or expired');
    return await usersLoad(args);
  },
  user: async (_parent: unknown, args: { id: string }, ctx: GraphqlContext) => {
    if (!ctx.user) throw handleGraphErr('User token missed or expired');
    return await userLoad(args);
  },
};

const userMutationsResolver = {
  createUser: async (
    _: unknown,
    args: { data: UserPayload },
    ctx: GraphqlContext
  ) => {
    {
      if (!ctx.user) throw handleGraphErr('User token missed or expired');
      return await userCreate(args);
    }
  },
  updateUser: async (
    _: unknown,
    args: { id: string; data: Omit<UserPayload, 'password'> },
    ctx: GraphqlContext
  ) => {
    if (!ctx.user) throw handleGraphErr('User token missed or expired');
    return await userUpdate(args);
  },
  deleteUser: async (_: unknown, args: { id: string }, ctx: GraphqlContext) => {
    if (!ctx.user) throw handleGraphErr('User token missed or expired');
    return await userDelete(args);
  },
};

export { userQueriesResolver, userMutationsResolver };
