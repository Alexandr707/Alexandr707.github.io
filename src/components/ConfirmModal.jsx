import React, { useState } from "react";
import { Box, Button, Modal, Typography } from "@mui/material";
import { Stack } from "@mui/system";

function ConfirmModal({ open, message, action }) {
    const [isOpen, setOpen] = useState(open);

    const style = {
        position: "absolute",
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: 400,
        bgcolor: "background.paper",
        border: "2px solid #000",
        boxShadow: 24,
        p: 4,
    };

    return (
        <Modal
            open={isOpen}
            onClose={() => {
                setOpen(false);
                action(false);
            }}
        >
            <Box sx={style}>
                <Typography variant="h6" component="div">
                    {message}
                </Typography>
                <Stack direction="row" spacing={2} sx={{ mt: 3 }}>
                    <Button
                        variant="contained"
                        color="secondary"
                        onClick={() => {
                            setOpen(false);
                            action(true);
                        }}
                    >
                        Ok
                    </Button>
                    <Button
                        variant="contained"
                        onClick={() => {
                            setOpen(false);
                            action(false);
                        }}
                    >
                        Cancel
                    </Button>
                </Stack>
            </Box>
        </Modal>
    );
}

export default ConfirmModal;
