import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { VARS } from "../../static/vars";

const initialState = {
    items: [],
    status: VARS.loading,
    selectedPostID: "",
    limit: 10,
};

export const getPosts = createAsyncThunk("getPosts", async () => {
    const { data } = await axios.get(`${VARS.postsURL}/posts`);
    return data;
});

export const deletePost = createAsyncThunk("deletePost", async (postId) => {
    const { data } = await axios.delete(`${VARS.postsURL}/posts/${postId}`);
    return data;
});

const postsSlice = createSlice({
    name: "posts",
    initialState,
    reducers: {
        addPost: (state, action) => {
            state.items.push(action.payload);
        },
        selectPost: (state, action) => {
            state.selectedPostID = state.selectedPostID === action.payload ? "" : action.payload;
        },
        removePost: (state, action) => {
            state.items = state.items.filter((item) => item.id !== action.payload);
        },
        setPostsLimit: (state, action) => {
            state.limit = action.payload;
        },
    },
    extraReducers: {
        [getPosts.pending]: (state) => {
            state.items = [];
            state.status = VARS.loading;
        },
        [getPosts.fulfilled]: (state, action) => {
            state.items = action.payload;
            state.status = VARS.loaded;
        },
        [getPosts.rejected]: (state) => {
            state.items = [];
            state.status = VARS.error;
        },
        [deletePost.fulfilled]: (state, action) => {
            state.items = state.items.filter((item) => item.id !== action.payload);
        },
    },
});

export const { selectPost, removePost, setPostsLimit, addPost } = postsSlice.actions;
export const postsReducer = postsSlice.reducer;
