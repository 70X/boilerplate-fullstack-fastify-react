import { useQuery } from '@apollo/client/react';
import { Box, CircularProgress, Container, Typography } from '@mui/material';

import TodoForm from '../components/TodoForm';
import TodoList from '../components/TodoList';
import { GET_TODOS, Todo } from '../todos.service';

const TodoPage = () => {
  const { data, loading, error } = useQuery<{ items: Todo[] }>(GET_TODOS);
  return (
    <Container>
      <Typography variant="h1">Todo Page</Typography>
      <Box
        sx={{
          width: '80%',
          mx: 'auto',
        }}
      >
        <TodoForm />
      </Box>
      {loading && <CircularProgress />}
      {error && 'Ups... something went in error'}
      {data && <TodoList items={data.items} />}
    </Container>
  );
};

export default TodoPage;
