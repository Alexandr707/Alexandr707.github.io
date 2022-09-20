import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { VARS } from "../../static/vars";

const initialState = {
    users: [],
    status: VARS.loading,
};

export const getUsers = createAsyncThunk("getUsers", async () => {
    const { data } = await axios.get(`${VARS.postsURL}/users`);
    return data;
});

const usersSlice = createSlice({
    name: "users",
    initialState,
    extraReducers: {
        [getUsers.pending]: (state) => {
            state.users = [];
            state.status = VARS.loading;
        },
        [getUsers.fulfilled]: (state, action) => {
            state.users = action.payload;
            state.status = VARS.loaded;
        },
        [getUsers.rejected]: (state) => {
            state.users = [];
            state.status = VARS.error;
        },
    },
});

export const usersReducer = usersSlice.reducer;
