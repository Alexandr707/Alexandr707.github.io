import axios from "axios";
import { useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import PostsList from "../components/PostsList";
import { VARS } from "../static/vars";
import { getUsers } from "../redeux/store";
import { CircularProgress } from "@mui/material";

function UserPosts({ children }) {
    const { id } = useParams();
    const dispatch = useDispatch();
    const users = useSelector((state) => state.users.users);
    const limit = useSelector((state) => state.posts.limit);
    const user = users.find((item) => item.id === parseInt(id));
    const [usersRequest, setUsersRequest] = useState(Boolean(users));
    const [posts, setPosts] = useState(null);
    const [status, setStatus] = useState(VARS.loading);

    useEffect(() => {
        if ((!users || users.length === 0) && !usersRequest) {
            dispatch(getUsers());
            setUsersRequest(true);
        }
    }, [dispatch, users, usersRequest]);

    useEffect(() => {
        if (user) {
            axios
                .get(VARS.postsURL + "/users/" + user.id + "/posts")
                .then((res) => {
                    setPosts(res.data);
                    setStatus(VARS.loaded);
                })
                .catch((err) => {
                    console.log(err);
                    setPosts([]);
                    setStatus(VARS.error);
                });
        }
    }, [user]);

    if (!user) {
        return null;
    }

    return Boolean(user) ? (
        <PostsList title={`${user.username} posts`} posts={posts || []} status={status} limit={limit || 10} />
    ) : (
        <CircularProgress />
    );
}

export default UserPosts;
