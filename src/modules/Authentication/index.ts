import { readFileSync } from 'fs';
import { AuthenticationMutation, AuthenticationQuery } from './Authentication.resolvers';

const AuthenticationTypeDef = readFileSync(
  require.resolve('../../schema/Authentication.schema.graphql')
).toString('utf-8');

export { AuthenticationTypeDef, AuthenticationMutation, AuthenticationQuery };
