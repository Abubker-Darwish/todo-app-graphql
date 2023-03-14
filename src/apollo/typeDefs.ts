import { taskTypeDef } from '@/modules/Task';
import { userTypeDef } from '@/modules/User';
import { AuthenticationTypeDef } from '@/modules/Authentication';

const typeDefs = [userTypeDef, taskTypeDef, AuthenticationTypeDef];

export default typeDefs.join(' ');
