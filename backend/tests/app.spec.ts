import { FastifyInstance } from 'fastify/types/instance';

import { buildApp } from '../src/app';

jest.mock('../src/plugins/queue', () => ({
  queue: 'mock_queue',
  initRabbitMQ: jest.fn().mockResolvedValue({
    sendToQueue: jest.fn(), // mock channel method
  }),
}));

describe('Healthy API Check', () => {
  let app: FastifyInstance;
  beforeAll(async () => {
    app = await buildApp(false);
  });

  it('should be healthy', async () => {
    const res = await app.inject({ method: 'GET', url: '/health' });
    expect(res.statusCode).toBe(200);
  });
});

describe('/send route', () => {
  let app: FastifyInstance;
  beforeAll(async () => {
    app = await buildApp(false);
  });

  it('should send a message to RabbitMQ', async () => {
    const response = await app.inject({ method: 'GET', url: '/send' });
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual('{"status":"sent","message":"Hello RabbitMQ!"}');
  });
});
