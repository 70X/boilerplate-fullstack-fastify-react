// server.js

import Fastify from 'fastify';

const fastify = Fastify({
  logger: {
    level: 'info',
  },
});

// Register plugins
// await fastify.register(routes);

// // Database connection
// await connectDatabase();

const start = async (): Promise<void> => {
  try {
    await fastify.listen({ port: 3000, host: '0.0.0.0' });
    fastify.log.info('Server is running on http://localhost:3000');
  } catch (error) {
    fastify.log.error(error);
    throw error; // Let Node.js handle the exit
  }
};

start();
