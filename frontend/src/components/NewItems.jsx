import React from "react";
import {
  Box,
  FormControl,
  Input,
  InputLabel,
  Typography,
  TextField,
} from "@mui/material";

const NewItems = ({ fields, handleInputChange }) => {
  return (
    <>
      {fields.map((field) => (
        <Box key={field.id} className="form-field" m="2rem 0 0 0" pb="2rem">
          <Typography variant="h6" sx={{ color: "#fff" }}>
            Item {field.id}
          </Typography>
          <TextField
            size="small"
            fullWidth
            id="standard-textarea"
            label="Description"
            onChange={(e) =>
              handleInputChange(field.id, "description", e.target.value)
            }
            multiline
            variant="standard"
            InputProps={{
              style: { color: "#fff", fontSize: "20px" },
              required: true,
            }}
            InputLabelProps={{
              style: { color: "#fff" },
            }}
            sx={{ m: "0 0 2rem 0" }}
          />
          <FormControl sx={{ width: "100%" }}>
            <InputLabel sx={{ color: "#fff" }}>Location</InputLabel>
            <Input
              size="small"
              sx={{
                color: "#fff",
                fontSize: "20px",
                paddingLeft: "15px",
              }}
              onChange={(e) =>
                handleInputChange(field.id, "location", e.target.value)
              }
            />
          </FormControl>
          <FormControl sx={{ width: "100%", marginTop: "2rem" }}>
            <InputLabel sx={{ color: "#fff" }}>Item</InputLabel>
            <Input
              size="small"
              sx={{
                color: "#fff",
                fontSize: "20px",
                paddingLeft: "15px",
              }}
              onChange={(e) =>
                handleInputChange(field.id, "item", e.target.value)
              }
            />
          </FormControl>
          <FormControl sx={{ m: "2rem 0 0 0" }}>
            <InputLabel sx={{ color: "#fff" }}>Day Total</InputLabel>
            <Input
            type="number"
              size="small"
              sx={{
                color: "#fff",
                fontSize: "20px",
                paddingLeft: "15px",
              }}
              value={field.dayTotal}
              onChange={(e) =>
                handleInputChange(field.id, "dayTotal", e.target.value)
              }
            />
          </FormControl>
        </Box>
      ))}
    </>
  );
};

export default NewItems;
