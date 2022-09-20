import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    login: "",
    password: "",
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        init: (state) => {
            const user = JSON.parse(window.localStorage.getItem("user"));
            if (user) {
                state.login = user.login;
                state.password = user.password;
            }
        },
        login: (state, action) => {
            state.login = action.payload.login;
            state.password = action.payload.password;

            window.localStorage.setItem("user", JSON.stringify(action.payload));
        },
        logout: (state) => {
            state.login = "";
            state.password = "";

            window.localStorage.removeItem("user");
        },
    },
});

export const authReducer = authSlice.reducer;
export const { init, login, logout } = authSlice.actions;
