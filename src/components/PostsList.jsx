import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { CircularProgress, Container, Grid } from "@mui/material";

import { VARS } from "../static/vars";
import { deletePost, removePost } from "../redeux/store";
import ConfirmModal from "./ConfirmModal";
import CustomPagination from "./CustomPagination";
import Post from "./Post";

function PostsList({ title, posts = [], status, limit }) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const isLogin = Boolean(useSelector((state) => state.auth.login));

    const [page, setPage] = useState(0);
    const postsSlice = posts.length > 0 ? posts.slice((page === 0 ? page : page - 1) * limit, (page || 1) * limit) : [];
    const [isConfirm, setConfirm] = useState(null);
    const message = "Remove post?";

    if (!postsSlice.length && posts.length > 0) {
        setPage(page - 1);
    }

    const closePost = (e, postId) => {
        e.stopPropagation();
        dispatch(removePost(postId));
    };

    const deletePostHandler = (isAccept) => {
        if (isAccept) {
            dispatch(deletePost(isConfirm)).then(({ payload }) => {
                if (typeof payload === "object") {
                    dispatch(removePost(isConfirm));
                }
            });
        }
        setConfirm(null);
    };

    return (
        <Container>
            {status === VARS.loading && <CircularProgress sx={{ mx: "auto" }} />}
            {status === VARS.loaded && (
                <>
                    <CustomPagination page={page} limit={limit} count={posts.length} setPage={setPage} />
                    <Grid container spacing={0.5}>
                        <Grid item xs={12}>
                            {title}
                        </Grid>
                        {postsSlice.length === 0
                            ? "NO posts"
                            : postsSlice.map((item, index) => {
                                  return (
                                      <Grid
                                          item
                                          xs={12}
                                          onClick={() => {
                                              navigate(`/posts/${item.id}`);
                                          }}
                                          key={item.id + index}
                                      >
                                          <Post
                                              isLogin={isLogin}
                                              deletePostID={setConfirm}
                                              post={item}
                                              closeAction={closePost}
                                          />
                                      </Grid>
                                  );
                              })}
                    </Grid>

                    <CustomPagination page={page} limit={limit} count={posts.length} setPage={setPage} />
                </>
            )}
            {isConfirm && <ConfirmModal message={message} open action={deletePostHandler} />}
        </Container>
    );
}

export default PostsList;
