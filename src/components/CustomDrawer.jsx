import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
    Autocomplete,
    CircularProgress,
    Drawer,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    TextField,
} from "@mui/material";

import { VARS } from "../static/vars";
import { setPostsLimit } from "../redeux/store";

function CustomDrawer({ open, isOpen, props }) {
    const dispatch = useDispatch();
    const { limit } = useSelector((state) => state.posts);
    const navigate = useNavigate();
    const { users, status } = useSelector((state) => state.users);
    const [inputVal, setVal] = useState("");
    const isLoading = Boolean(status === VARS.loading);

    const selectHandler = (e) => {
        dispatch(setPostsLimit(e.target.value));
    };

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
            <FormControl fullWidth sx={{ mt: 2 }}>
                <InputLabel id="demo-simple-select-label">Limit</InputLabel>
                <Select
                    label="Limit"
                    value={limit}
                    id="select-limit"
                    labelId="select-limit-label"
                    onChange={selectHandler}
                >
                    <MenuItem value={5}>5</MenuItem>
                    <MenuItem value={10}>10</MenuItem>
                    <MenuItem value={20}>20</MenuItem>
                    <MenuItem value={30}>30</MenuItem>
                </Select>
            </FormControl>
            <Autocomplete
                loading={isLoading}
                loadingText="Loading..."
                inputValue={inputVal}
                onInputChange={(_, str) => {
                    setVal(str);
                }}
                disablePortal
                options={users.map(({ id, username }) => ({ id, label: username }))}
                sx={{ width: 300, mt: 3 }}
                renderInput={(params) => <TextField {...params} label="Users" />}
                onChange={(_, data) => {
                    isOpen(false);
                    navigate("/users/" + data.id);
                }}
                isOptionEqualToValue={(option, value) => option.id === value.id}
            />
        </Drawer>
    );
}

export default CustomDrawer;
