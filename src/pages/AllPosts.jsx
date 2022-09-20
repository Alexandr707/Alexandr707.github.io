import React from "react";
import { useSelector } from "react-redux";
import PostsList from "../components/PostsList";

function AllPosts() {
    const { items, limit, status } = useSelector((state) => state.posts);

    return <PostsList title="All posts" posts={items} status={status} limit={limit} />;
}

export default AllPosts;
