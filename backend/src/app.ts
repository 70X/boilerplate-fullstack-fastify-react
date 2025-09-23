import Fastify, { type FastifyInstance } from 'fastify';
import fastifyHealthcheck from 'fastify-healthcheck';

export const buildApp = async (logger = true): Promise<FastifyInstance> => {
  const app = Fastify({ logger });

  app.register(fastifyHealthcheck);

  return app;
};
