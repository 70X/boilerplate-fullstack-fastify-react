import { Todo } from './todos.model';
import { builder } from '../../plugins/builder';

const todos: Todo[] = [];

const TodoItem = builder.objectRef<Todo>('TotoItem');

builder.objectType(TodoItem, {
  description: 'An item in the system',
  fields: (t) => ({
    id: t.exposeString('id'),
    title: t.exposeString('title'),
    description: t.exposeString('description'),
  }),
});

const ItemInput = builder.inputType('TodoInput', {
  fields: (t) => ({
    id: t.string(),
    title: t.string({ required: true }),
    description: t.string({ required: true }),
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
        input: t.arg({ type: ItemInput, required: true }),
      },
      resolve: (_, { input }) => {
        const newItem: Todo = {
          id: `item_${Date.now()}`,
          title: input.title,
          description: input.description,
        };

        todos.push(newItem);

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
        const index = todos.findIndex((item) => item.id === id);
        if (index === -1) return false;

        todos.splice(index, 1);
        return true;
      },
    }),
  }),
});
