import Fastify, { RouteHandlerMethod, type FastifyInstance } from 'fastify';
import fastifyHealthcheck from 'fastify-healthcheck';

import { initRabbitMQ, queue } from './plugins/queue';
import { createYogaInstance } from './plugins/yoga';

const createGraphQLHandler = (fastify: FastifyInstance): { handler: RouteHandlerMethod; endpoint: string } => {
  const graphQLServer = createYogaInstance();

  fastify.addContentTypeParser('multipart/form-data', {}, (req, payload, done) => done(null));

  const handler: RouteHandlerMethod = async (req, reply) => {
    const response = await graphQLServer.handleNodeRequestAndResponse(req, reply, {});

    response.headers.forEach((value, key) => {
      reply.header(key, value);
    });
    reply.status(response.status);
    reply.send(response.body);
    return reply;
  };

  return {
    handler,
    endpoint: graphQLServer.graphqlEndpoint,
  };
};

export const buildApp = async (logger = true): Promise<FastifyInstance> => {
  const app = Fastify({ logger });
  const graphQL = createGraphQLHandler(app);
  const channel = await initRabbitMQ();

  app.route({
    url: graphQL.endpoint,
    method: ['GET', 'POST', 'OPTIONS'],
    handler: graphQL.handler,
  });

  app.register(fastifyHealthcheck);

  app.get('/send', async () => {
    const msg = 'Hello RabbitMQ!';
    channel.sendToQueue(queue, Buffer.from(msg));
    return { status: 'sent', message: msg };
  });

  return app;
};
