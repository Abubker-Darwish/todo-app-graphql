import { hashPassword } from '@/services/auth';
import { handleGraphErr, pagination } from '@/services/global';
import prisma from '@/services/prismaClient';
import { GlobalFiltersType } from '@/types/globals';
import { Role } from '@prisma/client';
import { omit } from 'ramda';

export type UserPayload = {
  email: string;
  first_name: string;
  last_name: string;
  password: string;
  username: string;
  role: Role;
};

const usersLoad = async (args: { filter: GlobalFiltersType }) => {
  const {
    rpp = '99999999',
    page = '1',
    sort = 'asc',
    search = '',
  } = args.filter;

  try {
    const count = await prisma.user.count();
    const users = await prisma.user.findMany({
      take: +rpp,
      skip: +page * +rpp - +rpp,
      orderBy: { id: sort === 'desc' ? 'desc' : 'asc' },
      where: {
        first_name: { contains: search },
        last_name: { contains: search },
      },
      select: {
        password: false,
        email: true,
        created_at: true,
        first_name: true,
        id: true,
        last_name: true,
        username: true,
        role: true,
      },
    });
    const paginate = pagination({
      rpp: +rpp,
      page: +page,
      total: count,
    });
    return {
      result: users,
      pagination: paginate,
    };
  } catch (e) {
    throw handleGraphErr(e);
  }
};

const userLoad = async (args: { id: string }) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: Number(args.id),
      },
    });
    if (!user) throw new Error('User not found');
    const res = omit(['password'], user);

    return res;
  } catch (error) {
    throw handleGraphErr(error, {
      extensions: {
        code: 'BAD_USER_INPUT',
      },
    });
  }
};

const userCreate = async (args: { data: UserPayload }) => {
  const { data } = args;
  const hashed = await hashPassword(data.password);
  const user = await prisma.user.create({
    data: {
      email: data.email,
      first_name: data.first_name,
      last_name: data.last_name,
      username: data.username,
      password: hashed,
      role: data.role,
    },
  });
  const res = omit(['password'], user);
  return res || {};
};

const userUpdate = async (args: {
  id: string;
  data: Omit<UserPayload, 'password'>;
}) => {
  const target = await prisma.user.findUnique({
    where: {
      id: Number(args.id),
    },
  });

  const user = await prisma.user.update({
    data: {
      email: args.data.email || target?.email,
      first_name: args.data.first_name || target?.first_name,
      last_name: args.data.last_name || target?.last_name,
      username: args.data.username || target?.username,
      role: args.data.role || target?.role,
    },
    where: {
      id: Number(args.id),
    },
  });
  const res = omit(['password'], user);

  return res || {};
};

const userDelete = async (args: { id: string }) => {
  const user = await prisma.user.delete({
    where: {
      id: Number(args.id),
    },
  });
  return user;
};

export { usersLoad, userLoad, userCreate, userUpdate, userDelete };
