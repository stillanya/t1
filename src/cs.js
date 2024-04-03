import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchComments = createAsyncThunk(
    'comments/fetchComments',
    async (postId) => {
        const response = await axios.get(`https://dummyjson.com/docs/posts/${postId}/comments`);
        return response.data;
    }
);

export const addComment = createAsyncThunk(
    'comments/addComment',
    async ({ postId, body }) => {
        const response = await axios.post(`https://dummyjson.com/docs/posts/${postId}/comments`, { body });
        return response.data;
    }
);

export const deleteComment = createAsyncThunk(
    'comments/deleteComment',
    async (commentId) => {
        await axios.delete(`https://dummyjson.com/docs/comments/${commentId}`);
        return commentId;
    }
);

const commentsSlice = createSlice({
    name: 'comments',
    initialState: {
        comments: [],
        status: 'idle',
        error: null,
    },
    reducers: {},
    extraReducers: {
        [fetchComments.pending]: (state) => {
            state.status = 'loading';
        },
        [fetchComments.fulfilled]: (state, action) => {
            state.status = 'succeeded';
            state.comments = action.payload;
        },
        [fetchComments.rejected]: (state, action) => {
            state.status = 'failed';
            state.error = action.error.message;
        },
        [addComment.fulfilled]: (state, action) => {
            state.comments.push(action.payload);
        },
        [deleteComment.fulfilled]: (state, action) => {
            state.comments = state.comments.filter(comment => comment.id !== action.payload);
        },
    },
});

export default commentsSlice.reducer;
