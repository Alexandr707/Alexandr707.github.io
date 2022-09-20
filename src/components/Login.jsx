import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { Alert, Box, Button, Modal, TextField } from "@mui/material";

import { login } from "../redeux/store";

import styles from "./styles/login.module.scss";

const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
};

function Login({ isOpen, closeModal }) {
    const dispatch = useDispatch();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const formSubmit = (data) => {
        dispatch(login(data));
        closeModal(false);
    };

    return (
        <Modal open={isOpen} onClose={() => closeModal(false)}>
            <Box sx={style}>
                <form className={styles.loginForm} onSubmit={handleSubmit(formSubmit)}>
                    {errors.login && <Alert severity="warning">Login is required</Alert>}
                    <TextField
                        label="Login"
                        variant="standard"
                        type="text"
                        {...register("login", { required: true, pattern: new RegExp("^[\\w\\d]+$", "i") })}
                    />
                    {errors.password && <Alert severity="warning">Password required. {errors.password?.message}</Alert>}
                    <TextField
                        label="Password"
                        variant="standard"
                        type="password"
                        {...register("password", { required: true, minLength: 3, maxLength: 12 })}
                    />
                    <Button type="submit" variant="contained">
                        Login
                    </Button>
                </form>
            </Box>
        </Modal>
    );
}

export default Login;
