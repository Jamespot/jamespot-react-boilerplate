import {
    createAsyncThunk,
    createSlice,
    EnhancedStore,
    PayloadAction,
} from '@reduxjs/toolkit';
import jamespot from 'jamespot-user-api';

export type DemoState = {
    entities: {
        id: number;
        title: string;
        type: string;
        uri: string;
        mainType: string;
        _cssColor: string;
        _cssClass: string;
        url: string;
        firstname: string;
        lastname: string;
        company: string;
        mail: string;
    }[];
    loading: 'idle' | 'pending';
    keyword: string;
};
export type DemoRootState = {
    demoUser: DemoState;
};
export type DemoStore = EnhancedStore<DemoState>;

export const fetchSearchDemoUsers = createAsyncThunk(
    'demo/fetch',
    async (_, { getState }) => {
        const { loading, keyword } = (getState() as DemoRootState).demoUser;
        if (loading !== 'pending') {
            return;
        }
        return await jamespot.search.searchQuery({
            keywords: keyword,
            category: 'user',
            limit: 20,
        });
    }
);

export const demoUserSlice = createSlice({
    name: 'demoUser',
    initialState: {
        entities: [],
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
            .addCase(fetchSearchDemoUsers.pending, (state, action) => {
                if (state.loading === 'idle') {
                    state.loading = 'pending';
                }
            })
            .addCase(fetchSearchDemoUsers.fulfilled, (state, action) => {
                if (state.loading === 'pending') {
                    state.loading = 'idle';
                    state.entities = action.payload.result.results;
                }
            })
            .addCase(fetchSearchDemoUsers.rejected, (state, action) => {
                if (state.loading === 'pending') {
                    state.loading = 'idle';
                }
            });
    },
});

// Action creators are generated for each case reducer function
export const { setKeyword } = demoUserSlice.actions;
