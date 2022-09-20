import { Pagination } from "@mui/material";
import React from "react";

function CustomPagination({ page, limit, count, setPage }) {
    const pageQty = Math.ceil(count / limit);

    return (
        <Pagination
            page={page}
            count={pageQty}
            onChange={(e, n) => {
                setPage(n);
            }}
            shape="rounded"
            showFirstButton
            showLastButton
            sx={{ display: "flex", justifyContent: "center", margin: ".5rem" }}
        />
    );
}

export default CustomPagination;
