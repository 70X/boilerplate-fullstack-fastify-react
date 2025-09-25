import { Todo } from './todos.model';
import { builder } from '../../plugins/builder';

let todos: Todo[] = [];

const TodoItem = builder.objectRef<Todo>('TotoItem');

builder.objectType(TodoItem, {
  fields: (t) => ({
    id: t.exposeString('id'),
    title: t.exposeString('title'),
    description: t.exposeString('description'),
    completed: t.exposeBoolean('completed'),
    updatedAt: t.exposeString('updatedAt'),
    createdAt: t.exposeString('createdAt'),
  }),
});

const CreateItemInput = builder.inputType('CreateTodoInput', {
  fields: (t) => ({
    title: t.string({ required: true }),
    description: t.string(),
  }),
});

builder.queryFields((t) => ({
  items: t.field({
    type: [TodoItem],
    resolve: () => todos,
  }),
  item: t.field({
    type: TodoItem,
    args: {
      id: t.arg.string({ required: true }),
    },
    resolve: (_, { id }) => todos.find((todo) => todo.id === id) || null,
  }),
}));

builder.mutationType({
  fields: (t) => ({
    createTodoItem: t.field({
      type: TodoItem,
      description: 'Create a new item',
      args: {
        input: t.arg({ type: CreateItemInput, required: true }),
      },
      resolve: (_, { input }) => {
        const newItem: Todo = {
          id: `item_${Date.now()}`,
          title: input.title,
          description: input.description ?? undefined,
          completed: false,
        };

        // there is no need to compute a date at this stage. Db should do it automatically once is setup
        const date = new Date().toISOString();
        todos.push({ ...newItem, createdAt: date, updatedAt: date });

        return newItem;
      },
    }),
    deleteTodoItem: t.field({
      type: 'Boolean',
      description: 'Delete an item',
      args: {
        id: t.arg.string({ required: true }),
      },
      resolve: (_, { id }) => {
        const initialLength = todos.length;
        todos = todos.filter((item) => item.id !== id);
        return initialLength !== todos.length;
      },
    }),
  }),
});
