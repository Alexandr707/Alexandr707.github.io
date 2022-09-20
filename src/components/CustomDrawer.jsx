import React from "react";
import { useSelector } from "react-redux";
import { CircularProgress, Drawer, Link } from "@mui/material";

import { VARS } from "../static/vars";

function CustomDrawer({ open, isOpen, props }) {
    const { status } = useSelector((state) => state.users);
    const isLoading = Boolean(status === VARS.loading);

    return (
        <Drawer
            {...props}
            open={open}
            onClose={() => {
                isOpen(false);
            }}
            sx={{ "& .MuiDrawer-paper": { backgroundColor: "secondary.main" } }}
        >
            {open && isLoading && <CircularProgress />}

            <Link href="/verstka.html">Verstka.html</Link>
        </Drawer>
    );
}

export default CustomDrawer;
