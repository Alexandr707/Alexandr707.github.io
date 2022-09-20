import React, { Fragment, useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { CircularProgress, Container, Divider, Grid, Paper, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";

import { VARS } from "../static/vars";
import { Stack } from "@mui/system";
import CustomAccordion from "../components/CustomAccordion";

function FullPost() {
    const { postId } = useParams();
    const navigate = useNavigate();
    const [post, setPost] = useState(null);
    const [user, setUser] = useState(null);

    const CPeper = styled(Paper)(({ theme }) => ({
        backgroundColor: theme.palette.secondary.light,
        fontWeight: 600,
    }));

    useEffect(() => {
        const getPost = async () => {
            let userUrl = "";
            try {
                const {
                    data: { userId, ...postData },
                } = await axios.get(`${VARS.postsURL}/posts/${postId}`);
                setPost(postData);
                userUrl = `${VARS.postsURL}/users/${userId}`;
            } catch (e) {
                navigate("/error/" + e.response.status);
            }

            try {
                const { data: userData } = await axios.get(userUrl);
                setUser(userData);
            } catch (err) {
                setUser(null);
            }
        };

        getPost();
    }, [postId, navigate]);

    return (
        <Container>
            <Grid container columns={13} gap={1} sx={{ mt: 2, justifyContent: "stretch" }}>
                <Grid item xs={8} sx={{ p: 2 }} component={CPeper}>
                    {!post && <CircularProgress sx={{ justifySelf: "center" }} />}
                    {post && (
                        <Stack spacing={1}>
                            <Typography variant="h5" component="div" color="inherit">
                                {post.title}
                            </Typography>
                            <Divider sx={{ my: 3 }} />
                            <Typography variant="body1" component="div" color="inherit">
                                {post.body}
                            </Typography>
                        </Stack>
                    )}
                </Grid>

                <Grid item xs={4} sx={{ p: 2 }} component={CPeper}>
                    {!user && <CircularProgress sx={{ justifySelf: "center" }} />}
                    {user && (
                        <Stack spacing={1}>
                            {Object.keys(user)
                                .filter((el) => typeof user[el] !== "object")
                                .map((el, index) => (
                                    <Fragment key={index}>
                                        <Typography variant="body1" component="div" color="inherit">
                                            <b>{el}:</b>&nbsp;
                                            {user[el]}
                                        </Typography>
                                        <Divider sx={{ my: 3 }} />
                                    </Fragment>
                                ))}
                            {Object.keys(user)
                                .filter((el) => typeof user[el] === "object")
                                .map((el, index) => (
                                    <CustomAccordion key={index} name={el} obj={user[el]} component={CPeper} />
                                ))}
                        </Stack>
                    )}
                </Grid>
            </Grid>
        </Container>
    );
}

export default FullPost;
