import { configureStore } from "@reduxjs/toolkit";
import { postsReducer } from "./slices/posts-slice";
import { authReducer } from "./slices/auth-slice";
import { usersReducer } from "./slices/users-slice";

export * from "./slices/posts-slice.js";
export * from "./slices/users-slice.js";
export * from "./slices/auth-slice.js";

export const store = configureStore({
    reducer: {
        posts: postsReducer,
        auth: authReducer,
        users: usersReducer,
    },
});
