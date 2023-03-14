import variables from '@/variables';
import { StandaloneServerContextFunctionArgument } from '@apollo/server/dist/esm/standalone';
import { compare, genSaltSync, hash } from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { handleGraphErr } from './global';

export const comparePassword = (password: string, hashedPassword: string) => {
  return new Promise<boolean>((res) => {
    compare(password, hashedPassword, (err, same) => {
      if (err) res(false);
      else res(same);
    });
  });
};

export const createAccessToken = (data: Record<string, unknown>) => {
  return new Promise<string | undefined>((res, rej) => {
    jwt.sign(
      data,
      variables.secret || 'secret',
      { expiresIn: '5d' },
      (err, token) => {
        if (err) rej(err);
        res(token as string);
      }
    );
  });
};

export const hashPassword = (password: string) => {
  const salt = genSaltSync(10);
  return new Promise<string>((res) => {
    hash(password, salt, (err, saltedPassword: string) => {
      res(saltedPassword);
    });
  });
};

export const verifyToken = (token?: string) => {
  if (!token) return null;

  const res = jwt.verify(
    token,
    variables.secret || 'secret',
    {},
    (err, decoded) => {
      if (err) return null;
      return decoded;
    }
  );
  return res;
};

export const AuthenticationMiddleware = async (
  ctx: StandaloneServerContextFunctionArgument
) => {
  const token = ctx.req.headers.authorization;
  const loggedInfo = verifyToken(token);
  if (!loggedInfo) throw handleGraphErr('User token missed or expired');
  return new Promise((res) => res(loggedInfo));
};
