import { print } from 'graphql';

import { CREATE_TODO, GET_TODOS, Todo } from '../todos.service';

describe('Todos Service - Query Structure', () => {
  test('GET_TODOS should have correct fields', () => {
    const queryString = print(GET_TODOS);
    expect(queryString).toContain('items');
    expect(queryString).toContain('id');
    expect(queryString).toContain('title');
    expect(queryString).toContain('completed');
  });

  test('CREATE_TODO should accept correct input', () => {
    const mutationString = print(CREATE_TODO);
    expect(mutationString).toContain('createTodo');
    expect(mutationString).toContain('input: CreateTodoInput!');
  });

  test('Types should be properly defined', () => {
    const todo: Todo = {
      id: '1',
      title: 'Test',
      completed: false,
      createdAt: '2024-01-01',
      updatedAt: '2024-01-01',
    };
    expect(todo.id).toBe('1');
  });
});
