import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

import { setPostsLimit } from "../redeux/store";

function PostsQty() {
    const dispatch = useDispatch();
    const { limit } = useSelector((state) => state.posts);

    const selectHandler = (e) => {
        dispatch(setPostsLimit(e.target.value));
    };
    return (
        <FormControl fullWidth sx={{ maxWidth: "120px" }}>
            <InputLabel id="demo-simple-select-label">Limit</InputLabel>
            <Select label="Limit" value={limit} id="select-limit" labelId="select-limit-label" onChange={selectHandler}>
                <MenuItem value={5}>5</MenuItem>
                <MenuItem value={10}>10</MenuItem>
                <MenuItem value={20}>20</MenuItem>
                <MenuItem value={30}>30</MenuItem>
            </Select>
        </FormControl>
    );
}

export default PostsQty;
