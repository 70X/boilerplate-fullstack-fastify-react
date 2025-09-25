import { createYoga, type YogaServerInstance } from 'graphql-yoga';

import { builder } from './builder';
import '../features/todos/todos.schema';

const schema = builder.toSchema();

export const createYogaInstance = (): YogaServerInstance<object, object> => {
  return createYoga({ schema });
};
