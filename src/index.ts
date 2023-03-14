/* eslint-disable no-console */
import { startStandaloneServer } from '@apollo/server/standalone';
import apolloServer from './apollo';
import { handleErrMsg } from './services/global';
import colors from 'colors';
import { verifyToken } from './services/auth';
import variables from './variables';

const main = async () => {
  try {
    console.log(colors.yellow(`connecting...`));
    const app = await startStandaloneServer(apolloServer, {
      listen: { port: Number(variables.port) },
      context: (ctx) => {
        const token = ctx.req.headers.authorization;
        const loggedInfo = verifyToken(token);
        return new Promise((res) =>
          res({
            ...ctx,
            user: loggedInfo,
          })
        );
      },
    });
    console.log(`🚀 Server ready at: ${colors.cyan(app.url)}`);
  } catch (e) {
    const error = handleErrMsg(e);
    console.error(colors.red(error));
  }
};

void main();
