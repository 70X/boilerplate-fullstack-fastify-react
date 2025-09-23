import { FastifyInstance } from 'fastify/types/instance';

import { buildApp } from '../src/app';

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
