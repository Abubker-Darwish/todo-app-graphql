import { StandaloneServerContextFunctionArgument } from '@apollo/server/dist/esm/standalone';

export type GlobalFiltersType = {
  search?: string;
  rpp?: string;
  page?: string;
  sort?: string;
};

export type GraphqlContext = StandaloneServerContextFunctionArgument & {
  user: {
    id: number;
    first_name: string;
    last_name: string;
    username: string;
    email: string;
    created_at: string;
    iat: number;
    exp: number;
  } | null;
};
