import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ApiWrapper, jObjectLittle, SearchQueryResult } from 'jamespot-user-api';
import { ThunkExtensionsConfig } from './Store.types';

export const fetchSearchDemoUsers = createAsyncThunk<
  ApiWrapper<SearchQueryResult> | undefined,
  void,
  ThunkExtensionsConfig
>('demo/fetch', async (_, { extra, getState }) => {
  const { loading, keyword } = getState().extensions.demoUser;
  if (loading !== 'pending') {
    return;
  }
  return await extra.jApi.search.searchQuery({
    keywords: keyword === '' ? '*' : keyword,
    category: 'user',
    limit: 20,
  });
});

const demoUserSlice = createSlice({
  name: 'demoUser',
  initialState: {
    entities: [] as jObjectLittle[],
    loading: 'idle',
    keyword: '',
  },
  reducers: {
    setKeyword: (state, action: PayloadAction<string>) => {
      state.keyword = action.payload;
    },
  },
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
          state.entities = payload.result.results || [];
        }
      })
      .addCase(fetchSearchDemoUsers.rejected, (state) => {
        if (state.loading === 'pending') {
          state.loading = 'idle';
        }
      });
  },
});

// Action creators are generated for each case reducer function
export const { setKeyword } = demoUserSlice.actions;

export const DemoUser = {
  slice: demoUserSlice,
  actions: demoUserSlice.actions,
};
