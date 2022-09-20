import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { Autocomplete, TextField } from "@mui/material";

import { VARS } from "../static/vars";

function UserSelector() {
    const navigate = useNavigate();
    const { username } = useParams();
    const [inputVal, setVal] = useState(username || "Users");
    const { users, status } = useSelector((state) => state.users);

    return (
        <Autocomplete
            loading={Boolean(status === VARS.loading)}
            loadingText="Loading..."
            disablePortal
            sx={{ width: 300 }}
            options={users.map(({ id, username }) => ({ id, label: username }))}
            renderInput={(params) => <TextField {...params} label={username || "Users"} />}
            isOptionEqualToValue={(option, value) => option.id === value.id}
            inputValue={inputVal}
            onInputChange={(_, str) => {
                setVal(str);
            }}
            onChange={(_, data) => {
                navigate(`/users/${data.id}/${data.label}`);
            }}
        />
    );
}

export default UserSelector;
