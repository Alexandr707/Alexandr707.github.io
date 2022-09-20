import React, { Fragment } from "react";
import { Accordion, AccordionDetails, AccordionSummary, Typography } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

function CustomAccordion({ name, obj, component }) {
    return (
        <Accordion sx={{ backgroundColor: "inherit" }}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel2a-content">
                <Typography variant="body1" component="div" color="inherit">
                    <b>{name}</b>
                </Typography>
            </AccordionSummary>
            <AccordionDetails>
                {Object.keys(obj).map((el, index) => {
                    if (typeof obj[el] === "object") {
                        return null;
                    }
                    return (
                        <Fragment key={index}>
                            <Typography variant="body1" component="div" color="inherit">
                                <b>{el}:</b>&nbsp;
                                {obj[el]}
                            </Typography>
                        </Fragment>
                    );
                })}
            </AccordionDetails>
        </Accordion>
    );
}

export default CustomAccordion;
