import React from "react";
import { Link, useParams } from "react-router-dom";
import { Container, Typography, Stack } from "@mui/material";

function Error() {
    const { status } = useParams();

    return (
        <Container>
            <Stack spacing={2} sx={{ mt: 5, alignItems: "center" }}>
                <Typography variant="h3" component="h2" color="#a00">
                    Statuse code: {status}
                </Typography>
                <Link to="/posts">
                    <Typography variant="h6" component="div">
                        Back to home page
                    </Typography>
                </Link>
            </Stack>
        </Container>
    );
}

export default Error;
