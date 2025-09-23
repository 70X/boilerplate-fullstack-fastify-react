import Fastify from 'fastify';

import { buildApp } from './app';

const fastify = Fastify({
  logger: {
    level: 'info',
  },
});

const start = async (): Promise<void> => {
  try {
    const app = await buildApp();
    const port = Number(process.env.PORT) || 3000;

    await app.listen({ port, host: '0.0.0.0' });
    fastify.log.info(`Server is running on http://localhost:${port}`);
  } catch (err) {
    fastify.log.error({ error: err }, 'listen error');
    throw err;
  }
};

start();
