import React from "react";
import { BrowserRouter } from "react-router-dom";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import { store } from "./redeux/store";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { amber, brown } from "@mui/material/colors";

const theme = createTheme({
    palette: {
        primary: brown,
        secondary: {
            light: amber[100],
            main: amber[200],
            dark: amber[400],
        },
    },
});
window.theme = theme;
document.documentElement.style.minHeight = "100vh";
document.documentElement.style.backgroundColor = theme.palette.grey[200];

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <React.StrictMode>
        <Provider store={store}>
            <BrowserRouter>
                <ThemeProvider theme={theme}>
                    <App />
                </ThemeProvider>
            </BrowserRouter>
        </Provider>
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
