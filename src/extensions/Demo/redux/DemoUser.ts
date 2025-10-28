import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { ApiPagingResults, jUserLittle } from 'jamespot-user-api';
import { DemoUserState } from './DemoUser.types';
import { ThunkExtensionsConfig } from './Store.types';

export const fetchSearchDemoUsers = createAsyncThunk<
  ApiPagingResults<jUserLittle> | undefined,
  { query?: string },
  ThunkExtensionsConfig
>('demo/fetch', async (payload, { extra, getState }) => {
  const { loading } = getState().extensions.demoUser;
  if (loading !== 'pending') {
    return;
  }
  return await extra.jApi.user.userQueryList({
    ...payload,
    format: 'raw-little',
    limit: 20,
  });
});

const initialState: DemoUserState = {
  entities: [],
  loading: 'idle',
};

const demoUserSlice = createSlice({
  name: 'demoUser',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSearchDemoUsers.pending, (state) => {
        if (state.loading === 'idle') {
          state.loading = 'pending';
        }
      })
      .addCase(fetchSearchDemoUsers.fulfilled, (state, action) => {
        const payload = action.payload;
        if (state.loading === 'pending' && payload !== undefined) {
          state.loading = 'idle';
          state.entities = payload.result.data;
        }
      })
      .addCase(fetchSearchDemoUsers.rejected, (state) => {
        if (state.loading === 'pending') {
          state.loading = 'idle';
        }
      });
  },
});

export const DemoUser = {
  slice: demoUserSlice,
  actions: demoUserSlice.actions,
};
