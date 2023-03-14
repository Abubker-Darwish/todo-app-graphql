import { handleGraphErr } from '@/services/global';
import prisma from '@/services/prismaClient';

export type TaskPayload = {
  description: string;
  title: string;
  completed: boolean;
};

const userTasksLoad = async (userId: number) => {
  const tasks = await prisma.task.findMany({
    where: {
      userId: userId,
    },
  });
  return tasks || [];
};

const userSingleTaskLoad = async (args: { id: string; userId: number }) => {
  const task = await prisma.task.findFirst({
    where: {
      id: Number(args.id),
      userId: args.userId,
    },
  });
  return task;
};

const deleteTask = async (args: { id: string }) => {
  const task = await prisma.task.delete({
    where: {
      id: Number(args.id),
    },
  });
  return task;
};

const createTask = async (args: { data: TaskPayload; userId: number }) => {
  const task = await prisma.task.create({
    data: {
      description: args.data.description,
      title: args.data.title,
      completed: args.data.completed,
      userId: args.userId,
    },
  });
  return task;
};

const updateTask = async (
  id: string,
  args: { data: TaskPayload; userId: number }
) => {
  const target = await prisma.task.findFirst({
    where: {
      id: Number(id),
      userId: args.userId,
    },
  });
  if (!target) throw handleGraphErr('Task not found');

  const task = await prisma.task.update({
    where: {
      id: Number(id),
    },
    data: {
      description: args.data.description || target.description,
      title: args.data.title || target.title,
      completed: args.data.completed,
      userId: args.userId,
    },
  });
  return task;
};

export {
  userTasksLoad,
  userSingleTaskLoad,
  createTask,
  updateTask,
  deleteTask,
};
