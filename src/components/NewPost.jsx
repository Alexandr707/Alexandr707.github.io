import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { Alert, Box, Button, Modal, TextField } from "@mui/material";

import { addPost } from "../redeux/store";
import styles from "./styles/NewPost.module.scss";

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

function NewPost({ isNewPost, closeModal }) {
    const dispatch = useDispatch();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const formSubmit = (data) => {
        dispatch(addPost({ id: Date.now(), ...data }));
        closeModal(false);
    };

    return (
        <Modal open={isNewPost} onClose={() => closeModal(false)}>
            <Box sx={style}>
                <form className={styles.newPostForm} onSubmit={handleSubmit(formSubmit)}>
                    {errors.title && <Alert severity="warning">Please enter title</Alert>}
                    <TextField
                        label="Title"
                        variant="standard"
                        type="text"
                        {...register("title", { required: true })}
                    />
                    {errors.body && <Alert severity="warning">Please enter body {errors.body?.message}</Alert>}
                    <TextField
                        label="Body"
                        variant="standard"
                        multiline
                        rows={6}
                        {...register("body", { required: true })}
                    />
                    <div className={styles.btns}>
                        <Button type="submit" variant="contained" sx={{ backgroundColor: "secondary.dark" }}>
                            Add post
                        </Button>
                        <Button variant="contained" onClick={() => closeModal(false)}>
                            Cancel
                        </Button>
                    </div>
                </form>
            </Box>
        </Modal>
    );
}

export default NewPost;
