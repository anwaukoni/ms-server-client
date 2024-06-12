import { createAsyncThunk } from '@reduxjs/toolkit';
import { Task, addTasks } from './taskSlice';
import { RootState } from '../../app/store';
import { apiSlice } from '../../app/api/apiSlice';

export const fetchTasks = createAsyncThunk<
  Task[],
  void,
  { rejectValue: { error: string } }
>('tasks/fetchTasks', async (_, { dispatch, rejectWithValue }) => {
  const state = getState() as RootState;
  const token = state.auth.token;
  try {
    const response = await fetch('http://localhost:3333/tasks', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/x-wwww-form-urlencoded',
        Authorization: `Bearer ${token}`,
        'Content-Length': '0',
      },
    });
    if (!response.ok) {
      return rejectWithValue({ error: 'Network response was not ok' });
    }
    const data: Task[] = await response.json();

    const result = data.map(({ id, message, sortOrder }) => ({
      id,
      message,
      sortOrder,
    }));
    dispatch(addTasks(result));
    return data;
  } catch (error: any) {
    return rejectWithValue({ error: error.message });
  }
});

export const batchAddTasks = createAsyncThunk<
  Task[],
  void,
  { rejectValue: { error: string } }
>('tasks/addTasks', async (_, { getState, rejectWithValue }) => {
  try {
    const state = getState() as RootState;
    const tasks: any = state.tasks;
    if (!tasks) {
      return;
    }
    const token = state.auth.token;
    const response = await fetch('http://localhost:3333/tasks/batch', {
      method: 'POST',
      body: JSON.stringify(tasks),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token} `,
      },
    });
    if (!response.ok) {
      return rejectWithValue({ error: 'Network response was not ok' });
    }
    const status = await response.json();
    return status;
  } catch (error: any) {
    return rejectWithValue({ error: error.message });
  }
});

export const taskApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    batchAdd: builder.mutation({
      query: (credentials) => ({
        url: '/tasks/batch',
        method: 'POST',
        body: { ...credentials },
      }),
    }),
  }),
});

export const { useBatchAddMutation } = taskApiSlice;

function getState(): {
  api: import('@reduxjs/toolkit/query').CombinedState<{}, never, 'api'>;
  auth: { user: null; token: null };
  tasks: Task[];
} {
  throw new Error('Function not implemented.');
}
