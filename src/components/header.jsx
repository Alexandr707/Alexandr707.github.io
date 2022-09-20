import React, { Fragment, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import MenuIcon from "@mui/icons-material/Menu";
import { AppBar, Button, IconButton, Toolbar, Typography } from "@mui/material";

import { logout } from "../redeux/store";
import CustomeLink from "./CustomLink";
import LoginButton from "./LoginButton";
import CustomDrawer from "./CustomDrawer";
import NewPost from "./NewPost";

function Header() {
    const dispatch = useDispatch();
    const [isOpen, setOpen] = useState(false);
    const [isNewPost, setNewPost] = useState(false);
    const { login: user } = useSelector((state) => state.auth);
    const isAuth = Boolean(user);

    return (
        <>
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        aria-label="menu"
                        color="inherit"
                        sx={{ mr: 2 }}
                        onClick={() => {
                            setOpen(true);
                        }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="body1" component="div" sx={{ flexGrow: 1 }}>
                        <CustomeLink to="/posts">
                            <Typography variant="h6">Posts</Typography>
                        </CustomeLink>
                    </Typography>
                    {isAuth && (
                        <Typography variant="h6" component="div" sx={{ mr: 2 }}>
                            {user}
                        </Typography>
                    )}

                    {isAuth ? (
                        <>
                            <Button
                                color="inherit"
                                variant="outlined"
                                onClick={() => {
                                    setNewPost(true);
                                }}
                                sx={{ backgroundColor: "success.main", mx: 2 }}
                            >
                                <Typography variant="body1">Add post</Typography>
                            </Button>
                            <Button
                                color="inherit"
                                variant="outlined"
                                onClick={() => dispatch(logout())}
                                sx={{ backgroundColor: "primary.dark" }}
                            >
                                <Typography variant="body1">Logout</Typography>
                            </Button>
                        </>
                    ) : (
                        <LoginButton>
                            <Typography variant="body1">Login</Typography>
                        </LoginButton>
                    )}
                </Toolbar>
            </AppBar>
            <CustomDrawer open={isOpen} isOpen={setOpen} />
            <NewPost isNewPost={isNewPost} closeModal={setNewPost} />
        </>
    );
}

export default Header;
