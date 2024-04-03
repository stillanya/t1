import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchPosts = createAsyncThunk(
    'posts/fetchPosts',
    async () => {
        const response = await axios.get('https://dummyjson.com/posts?limit=25');
        return response.data;
    }
);

const postsSlice = createSlice({
    name: 'posts',
    initialState: {
        posts: [],
        status: 'idle',
        error: null,
    },
    reducers: {},
    extraReducers: {
        [fetchPosts.pending]: (state) => {
            state.status = 'loading';
        },
        [fetchPosts.fulfilled]: (state, action) => {
            state.status = 'succeeded';
            state.posts = action.payload;
        },
        [fetchPosts.rejected]: (state, action) => {
            state.status = 'failed';
            state.error = action.error.message;
        },
    },
});

export default postsSlice.reducer;
