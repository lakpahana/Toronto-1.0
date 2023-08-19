import React from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  FormControl,
  Input,
  InputLabel,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const DistinctItems = ({
  distinctDataFields,
  expanded,
  handleChange,
  handleInputChange,
}) => {
  return (
    <>
      {distinctDataFields &&
        distinctDataFields.map((item, index) => (
          <Accordion
            key={index}
            expanded={expanded === `panel${index}`}
            onChange={handleChange(`panel${index}`)}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls={`panel${index}bh-content`}
              id={`panel${index}bh-header`}
            >
              <Typography sx={{ width: "33%", flexShrink: 0 }}>
                {item.id}
              </Typography>
              <Typography sx={{ color: "text.secondary" }}>
                {item.description}
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <FormControl sx={{ m: "2rem 0 0 0" }}>
                <InputLabel sx={{ color: "#000" }}>Day Total</InputLabel>
                <Input
                placeholder="0"
                  size="small"
                  onChange={(e) =>
                    handleInputChange(item.id, "dayTotal", e.target.value)
                  }
                />
              </FormControl>
            </AccordionDetails>
          </Accordion>
        ))}
    </>
  );
};

export default DistinctItems;
