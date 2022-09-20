import React, { useEffect, useState } from "react";
import { IconButton, useTheme } from "@mui/material";
import KeyboardDoubleArrowUpIcon from "@mui/icons-material/KeyboardDoubleArrowUp";

function ArrowUp() {
    const theme = useTheme();
    const [isScrolled, setScrolled] = useState(false);

    useEffect(() => {
        const scrollFunc = () => {
            if (window.pageYOffset > 50) {
                setScrolled(true);
            } else {
                setScrolled(false);
            }
        };
        document.addEventListener("scroll", scrollFunc);

        return () => {
            document.removeEventListener("scroll", scrollFunc);
        };
    }, []);

    if (!isScrolled) {
        return null;
    }

    return (
        <IconButton
            onClick={() => {
                window.scrollTo({ behavior: "smooth", top: 0 });
            }}
            sx={{
                position: "fixed",
                right: 3,
                bottom: 3,
                backgroundColor: theme.palette.primary.main,
            }}
        >
            <KeyboardDoubleArrowUpIcon color="inherit" />
        </IconButton>
    );
}

export default ArrowUp;
