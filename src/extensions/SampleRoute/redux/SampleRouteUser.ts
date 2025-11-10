import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { ApiPagingResults, jUserLittle } from 'jamespot-user-api';
import { SampleRouteUserState } from './SampleRouteUser.types';
import { ThunkExtensionsConfig } from './Store.types';

export const fetchSearchSampleRouteUsers = createAsyncThunk<
  ApiPagingResults<jUserLittle> | undefined,
  { query?: string },
  ThunkExtensionsConfig
>('sampleRoute/fetch', async (payload, { extra, getState }) => {
  const { loading } = getState().extensions.sampleRouteUser;
  if (loading !== 'pending') {
    return;
  }
  return await extra.jApi.user.userQueryList({
    ...payload,
    format: 'raw-little',
    limit: 20,
  });
});

const initialState: SampleRouteUserState = {
  entities: [],
  loading: 'idle',
};

const sampleRouteUserSlice = createSlice({
  name: 'sampleRouteUser',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSearchSampleRouteUsers.pending, (state) => {
        if (state.loading === 'idle') {
          state.loading = 'pending';
        }
      })
      .addCase(fetchSearchSampleRouteUsers.fulfilled, (state, action) => {
        const payload = action.payload;
        if (state.loading === 'pending' && payload !== undefined) {
          state.loading = 'idle';
          state.entities = payload.result.data;
        }
      })
      .addCase(fetchSearchSampleRouteUsers.rejected, (state) => {
        if (state.loading === 'pending') {
          state.loading = 'idle';
        }
      });
  },
});

export const SampleRouteUser = {
  slice: sampleRouteUserSlice,
  actions: sampleRouteUserSlice.actions,
};
