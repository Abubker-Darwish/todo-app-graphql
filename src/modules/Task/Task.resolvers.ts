import { handleGraphErr } from '@/services/global';
import { GraphqlContext } from '@/types/globals';
import {
  userSingleTaskLoad,
  userTasksLoad,
  createTask,
  TaskPayload,
  updateTask,
  deleteTask,
} from './Task.controller';

const taskQueriesResolver = {
  tasks: async (_: unknown, __: unknown, ctx: GraphqlContext) => {
    if (!ctx.user) throw handleGraphErr('User token missed or expired');
    return await userTasksLoad(ctx.user.id);
  },
  task: async (_: unknown, args: { id: string }, ctx: GraphqlContext) => {
    if (!ctx.user) throw handleGraphErr('User token missed or expired');
    return await userSingleTaskLoad({
      id: args.id,
      userId: ctx.user.id,
    });
  },
};

const taskMutationsResolver = {
  createTask: async (
    _: unknown,
    args: { data: TaskPayload },
    ctx: GraphqlContext
  ) => {
    if (!ctx.user) throw handleGraphErr('User token missed or expired');
    return await createTask({
      data: args.data,
      userId: ctx.user.id,
    });
  },
  updateTask: async (
    _: unknown,
    args: { id: string; data: TaskPayload },
    ctx: GraphqlContext
  ) => {
    if (!ctx.user) throw handleGraphErr('User token missed or expired');
    return await updateTask(args.id, { data: args.data, userId: ctx.user.id });
  },
  deleteTask: async (_: unknown, args: { id: string }, ctx: GraphqlContext) => {
    if (!ctx.user) throw handleGraphErr('User token missed or expired');
    return await deleteTask(args);
  },
};

export { taskQueriesResolver, taskMutationsResolver };
