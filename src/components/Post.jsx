import React from "react";
import { Divider, IconButton, Typography } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import CloseIcon from "@mui/icons-material/Close";

import styles from "./styles/Post.module.scss";

function Post({ isLogin, deletePostID, post, closeAction }) {
    return (
        <div className={styles.postContent}>
            <div className={styles.postIcons}>
                {isLogin && (
                    <IconButton
                        color="primary"
                        onClick={(e) => {
                            e.stopPropagation();
                            deletePostID(post.id);
                        }}
                    >
                        <DeleteIcon />
                    </IconButton>
                )}
                <IconButton
                    color="error"
                    onClick={(e) => {
                        closeAction(e, post.id);
                    }}
                >
                    <CloseIcon />
                </IconButton>
            </div>
            <Typography variant="h6" element="div">
                {post.title}
            </Typography>
            <Divider />
            <Typography variant="body1" element="div">
                {post.body}
            </Typography>
        </div>
    );
}

export default Post;
