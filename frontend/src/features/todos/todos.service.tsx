import { gql } from '@apollo/client';

export interface Todo {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CreateTodoInput {
  title: string;
  description?: string;
}

export interface UpdateTodoInput {
  id: string;
  title?: string;
  description?: string;
  completed?: boolean;
}

export const GET_TODOS = gql`
  query GetTodos {
    items {
      id
      title
      description
      completed
      createdAt
      updatedAt
    }
  }
`;

export const GET_TODO_BY_ID = gql`
  query GetTodoById($id: ID!) {
    item(id: $id) {
      id
      title
      description
      completed
      createdAt
      updatedAt
    }
  }
`;

export const CREATE_TODO = gql`
  mutation CreateTodo($input: CreateTodoInput!) {
    createTodoItem(input: $input) {
      id
      title
      description
      completed
      createdAt
      updatedAt
    }
  }
`;

export const DELETE_TODO = gql`
  mutation DeleteTodo($id: ID!) {
    deleteTodoItem(id: $id) {
      id
      message
    }
  }
`;

export const TOGGLE_TODO_COMPLETED = gql`
  mutation ToggleTodoCompleted($id: ID!) {
    updateTodoItem(input: { id: $id, completed: true }) {
      id
      completed
      updatedAt
    }
  }
`;

// Optional: Subscription for real-time updates
export const TODO_SUBSCRIPTION = gql`
  subscription TodoUpdated {
    todoUpdated {
      id
      title
      description
      completed
      createdAt
      updatedAt
    }
  }
`;
