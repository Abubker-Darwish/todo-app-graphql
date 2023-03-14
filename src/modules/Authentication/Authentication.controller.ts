import {
  comparePassword,
  createAccessToken,
  hashPassword,
} from '@/services/auth';
import { handleGraphErr } from '@/services/global';
import prisma from '@/services/prismaClient';
import { omit } from 'ramda';

type InputLoginType = {
  username: string;
  password: string;
};

type SignUpUserPayload = {
  email: string;
  first_name: string;
  password: string;
  last_name: string;
  role: string;
  username: string;
};

const userLogin = async (_: unknown, args: { data: InputLoginType }) => {
  const { username, password } = args.data;
  const user = await prisma.user.findUnique({
    where: { username },
  });

  if (!user) throw handleGraphErr('Invalid email or password');
  const isMatched = await comparePassword(password, user.password);
  if (!isMatched) throw handleGraphErr('Invalid email or password');

  const loggedInUser = omit(['password'], user);

  const accessToken = await createAccessToken(loggedInUser);
  if (!accessToken) throw handleGraphErr('Something went wrong');

  return {
    user: loggedInUser,
    token: accessToken,
  };
};

const signUp = async (_: unknown, args: { data: SignUpUserPayload }) => {
  const { data } = args;
  const user = await prisma.user.findUnique({
    where: { username: data.username },
  });

  if (user) throw handleGraphErr('user name already Taken');

  const hashed = await hashPassword(data.password);
  const createdUser = await prisma.user.create({
    data: {
      email: data.email,
      username: data.username,
      first_name: data.first_name,
      last_name: data.last_name,
      password: hashed,
    },
  });
  const loggedInUser = omit(['password'], createdUser);

  const accessToken = await createAccessToken(loggedInUser);
  if (!accessToken) throw handleGraphErr('Something went wrong');

  return {
    user: loggedInUser,
    token: accessToken,
  };
};

export { userLogin, signUp };
