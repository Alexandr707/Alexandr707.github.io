import React from "react";
import { useSelector } from "react-redux";
import { CircularProgress, Drawer, Link } from "@mui/material";
import { teal } from "@mui/material/colors";

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
      sx={{ "& .MuiDrawer-paper": { backgroundColor: teal[50] } }}
    >
      {open && isLoading && <CircularProgress />}

      <Link
        href="https://main--alexpf-lordf.netlify.app/"
        sx={{ paddingX: 2, paddingY: 1, fontWeight: 600, fontSize: "24px", backgroundColor: teal[200] }}
      >
        LordFilms
      </Link>
    </Drawer>
  );
}

export default CustomDrawer;
