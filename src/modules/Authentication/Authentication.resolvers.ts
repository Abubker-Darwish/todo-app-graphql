import { handleGraphErr } from '@/services/global';
import { GraphqlContext } from '@/types/globals';
import { userLogin, signUp } from './Authentication.controller';

const AuthenticationMutation = {
  login: userLogin,
  signUp,
};

const AuthenticationQuery = {
  current_user: (_: unknown, _args: unknown, ctx: GraphqlContext) => {
    if (!ctx.user) throw handleGraphErr('User token missed or expired');
    return ctx.user;
  },
};

export { AuthenticationMutation, AuthenticationQuery };
