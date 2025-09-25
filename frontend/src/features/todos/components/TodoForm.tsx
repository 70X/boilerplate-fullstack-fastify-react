import { useMutation } from '@apollo/client/react';
import { Add as AddIcon } from '@mui/icons-material';
import { Alert, Box, Button, CircularProgress, Paper, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';

import { CREATE_TODO, CreateTodoInput, GET_TODOS } from '../todos.service';

interface FormData {
  title: string;
  description: string;
}

const TodoForm: React.FC = () => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isValid, isDirty },
  } = useForm<FormData>({
    mode: 'onChange',
    defaultValues: {
      title: '',
      description: '',
    },
  });
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [createTodo, { loading, error }] = useMutation(CREATE_TODO, {
    refetchQueries: [{ query: GET_TODOS }],
    onCompleted: () => {
      reset();
    },
  });

  const onSubmit = async (data: FormData) => {
    const input: CreateTodoInput = {
      title: data.title.trim(),
      description: data.description.trim() || undefined,
    };

    try {
      await createTodo({ variables: { input } });
    } catch (err) {
      setErrorMessage('Failed to create todo');
      // eslint-disable-next-line no-console
      console.error('Failed to create todo:', err);
    }
  };

  return (
    <Paper elevation={2} sx={{ p: 3, mb: 3 }}>
      {errorMessage ?? (
        <Alert variant="filled" severity="error">
          {errorMessage}
        </Alert>
      )}
      <Typography variant="h6" gutterBottom>
        Add New Todo
      </Typography>

      <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ mt: 2 }}>
        <Controller
          name="title"
          control={control}
          rules={{
            required: 'Title is required',
            minLength: {
              value: 1,
              message: 'Title cannot be empty',
            },
            validate: (value) => value.trim().length > 0 || 'Title cannot be just spaces',
          }}
          render={({ field }) => (
            <TextField
              {...field}
              fullWidth
              label="Title"
              variant="outlined"
              placeholder="What needs to be done?"
              disabled={loading}
              error={!!errors.title}
              helperText={errors.title?.message}
              sx={{ mb: 2 }}
            />
          )}
        />

        <Controller
          name="description"
          control={control}
          rules={{
            maxLength: {
              value: 500,
              message: 'Description cannot exceed 500 characters',
            },
          }}
          render={({ field }) => (
            <TextField
              {...field}
              fullWidth
              label="Description"
              variant="outlined"
              multiline
              rows={3}
              placeholder="Optional description..."
              disabled={loading}
              error={!!errors.description}
              helperText={errors.description?.message}
              sx={{ mb: 2 }}
            />
          )}
        />

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            Failed to create todo: {error.message}
          </Alert>
        )}

        <Button
          type="submit"
          variant="contained"
          size="large"
          startIcon={loading ? <CircularProgress size={20} color="inherit" /> : <AddIcon />}
          disabled={!isValid || !isDirty || loading}
          fullWidth
        >
          {loading ? 'Creating...' : 'Add Todo'}
        </Button>
      </Box>
    </Paper>
  );
};

export default TodoForm;
