import React from "react";
import { Link } from "react-router-dom";

function CustomLink({ children, ...props }) {
    const style = {
        color: "inherit",
        fontSize: "inherit",
        textDecoration: "none",
    };
    return (
        <Link {...props} style={style}>
            {children}
        </Link>
    );
}

export default CustomLink;
