import { Container, Divider, Stack, Typography } from '@mui/material';

import { Todo } from '../todos.service';

type Props = { items: Todo[] };

const TodoList = ({ items }: Props) => {
  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Todo List
      </Typography>
      {items.map((item) => (
        <Stack key={item.id}>
          <Stack direction="row" spacing={2}>
            <Typography>{item.title}</Typography>
            <Typography>{item.description}</Typography>
          </Stack>
          <Divider />
        </Stack>
      ))}
    </Container>
  );
};

export default TodoList;
