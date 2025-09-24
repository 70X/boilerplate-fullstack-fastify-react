import Fastify, { RouteHandlerMethod, type FastifyInstance } from 'fastify';
import fastifyHealthcheck from 'fastify-healthcheck';

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

  app.route({
    url: graphQL.endpoint,
    method: ['GET', 'POST', 'OPTIONS'],
    handler: graphQL.handler,
  });

  app.register(fastifyHealthcheck);

  return app;
};
