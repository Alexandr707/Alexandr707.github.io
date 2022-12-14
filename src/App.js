import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { useDispatch } from "react-redux";

import Header from "./components/header";

import "./App.css";
import { getPosts, getUsers, init } from "./redeux/store";
import ArrowUp from "./components/ArrowUp";
import FullPost from "./pages/FullPost";
import Error from "./pages/Error";
import UserPosts from "./pages/UserPosts";
import AllPosts from "./pages/AllPosts";
import Navigation from "./pages/Navigation";

function App() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getPosts());
        dispatch(getUsers());
        dispatch(init());
    }, [dispatch]);

    return (
        <>
            <Header />
            <Routes>
                <Route index element={<AllPosts />} />
                <Route path="posts">
                    <Route index element={<AllPosts />} />
                    <Route path=":postId" element={<FullPost />} />
                </Route>
                <Route path="users/:id/:username" element={<UserPosts />} />
                <Route path="error/:status" element={<Error />} />
                <Route path="*" element={<Navigation />} />
            </Routes>

            <ArrowUp />
        </>
    );
}
export default App;
