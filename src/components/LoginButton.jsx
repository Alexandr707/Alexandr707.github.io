import React, { useState } from "react";
import { Button } from "@mui/material";

import Login from "./Login";

function LoginButton({ children }) {
    const [isLogin, setLogin] = useState(false);

    return (
        <>
            <Button color="inherit" variant="outlined" onClick={() => setLogin(true)}>
                {children}
            </Button>
            <Login isOpen={isLogin} closeModal={setLogin} />
        </>
    );
}

export default LoginButton;
