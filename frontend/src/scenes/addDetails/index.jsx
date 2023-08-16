import {
  Box,
  Button,
  CardContent,
  FormControl,
  Grid,
  Input,
  InputLabel,
  TextField,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import React, { useState } from "react";
import { makeStyles } from "@mui/styles";
import { DataGrid } from "@mui/x-data-grid";
import { tableData } from "../../data/tableData";

const useStyles = makeStyles({
  cardBg: {
    minWidth: 275,
    maxWidth: "80vw",
    maxHeight: "55vh",
    minHeight: "420px",
    overflowY: "auto !important",
    background: "rgba(255, 255, 255, 0.35)",
    borderRadius: "16px",
    boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
    backdropFilter: "blur(5px)",
    "-webkit-backdrop-filter": "blur(5px)",
    border: "1px solid rgba(255, 255, 255, 0.3)",
  },
  tableCard: {
    minWidth: 275,
    maxHeight: "55vh",
    minHeight: "420px",
    overflowY: "auto !important",
    background: "rgba(255, 255, 255, 0.35)",
    borderRadius: "16px",
    boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
    backdropFilter: "blur(5px)",
    "-webkit-backdrop-filter": "blur(5px)",
    border: "1px solid rgba(255, 255, 255, 0.3)",
    display: "flex",
    alignItems: "center",
  },
  content: {
    height: "calc(100vh - 80px)",
    overflowY: "auto",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    margin: "auto 5rem auto 5rem",
  },
});

const columns = [
  {
    field: "item",
    headerName: "Item",
    flex: 1,
  },
  {
    field: "description",
    headerName: "Description",
    flex: 2,
  },
  {
    field: "location",
    headerName: "Location/Stations",
    flex: 1,
  },
  {
    field: "dayTotal",
    headerName: "Day's Total",
    flex: 1,
  },
  {
    field: "totalToDate",
    headerName: "Total To Date",
    flex: 1,
  },
];

const AddDetails = () => {
  const classes = useStyles();

  const isMobile = useMediaQuery("(max-width: 685px)");
  const [fields, setFields] = useState([
    { id: 1, description: "", location: "", dayTotal: "" },
  ]);
  const [date, setDate] = useState("");
  let [count, setCount] = useState(1);

  const addField = () => {
    const newField = {
      id: fields.length + 1,
      description: "",
      location: "",
      dayTotal: "",
    };
    setFields([...fields, newField]);
    setCount(++count);
  };

  const deleteField = () => {
    const newField = fields.filter((field) => field.id !== count);
    setFields(newField);
    setCount(--count);
  };

  const handleInputChange = (id, inputType, value) => {
    const updatedFields = fields.map((field) =>
      field.id === id ? { ...field, [inputType]: value } : field
    );
    setFields(updatedFields);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = [{ date: date, fieldData: fields }];
    console.log(data);
  };

  return (
    <Box className={classes.content}>
      <Grid container spacing={2}>
        <Grid item xs={5}>
          <Box width="100%" maxWidth="800px">
            <div className={classes.cardBg}>
              <CardContent>
                <form>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer components={["DatePicker"]}>
                      <DatePicker
                        label="Select the Date"
                        onChange={(newValue) => setDate(newValue)}
                      />
                    </DemoContainer>
                  </LocalizationProvider>
                  {fields.map((field) => (
                    <Box
                      key={field.id}
                      className="form-field"
                      m="2rem 0 0 0"
                      pb="2rem"
                    >
                      <Typography variant="h6" sx={{ color: "#fff" }}>
                        Item {field.id}
                      </Typography>
                      <TextField
                        size="small"
                        fullWidth
                        id="standard-textarea"
                        label="Description"
                        value={field.description}
                        onChange={(e) =>
                          handleInputChange(
                            field.id,
                            "description",
                            e.target.value
                          )
                        }
                        multiline
                        variant="standard"
                        InputProps={{
                          style: { color: "#fff", fontSize: "20px" },
                        }}
                        InputLabelProps={{
                          style: { color: "#fff" },
                        }}
                        sx={{ m: "0 0 2rem 0" }}
                      />
                      <FormControl sx={{ width: isMobile ? "100%" : "50%" }}>
                        <InputLabel sx={{ color: "#fff" }}>Location</InputLabel>
                        <Input
                          size="small"
                          sx={{
                            color: "#fff",
                            fontSize: "20px",
                            paddingLeft: "15px",
                          }}
                          value={field.location}
                          onChange={(e) =>
                            handleInputChange(
                              field.id,
                              "location",
                              e.target.value
                            )
                          }
                        />
                      </FormControl>
                      <FormControl sx={{ m: "2rem 0 0 0" }}>
                        <InputLabel sx={{ color: "#fff" }}>
                          Day Total
                        </InputLabel>
                        <Input
                          size="small"
                          sx={{
                            color: "#fff",
                            fontSize: "20px",
                            paddingLeft: "15px",
                          }}
                          value={field.dayTotal}
                          onChange={(e) =>
                            handleInputChange(
                              field.id,
                              "dayTotal",
                              e.target.value
                            )
                          }
                        />
                      </FormControl>
                    </Box>
                  ))}
                </form>
                <Box
                  m="2rem 0 0 0"
                  display="flex"
                  gap="1rem"
                  width="100%"
                  justifyContent="center"
                >
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={addField}
                  >
                    New
                  </Button>
                  <Button
                    type="submit"
                    variant="contained"
                    color="secondary"
                    onClick={handleSubmit}
                  >
                    Submit
                  </Button>
                  {count !== 1 && (
                    <Button
                      variant="contained"
                      color="error"
                      onClick={deleteField}
                    >
                      Delete
                    </Button>
                  )}
                </Box>
              </CardContent>
            </div>
          </Box>
        </Grid>
        <Grid item xs={7}>
          <Box width="100%" maxWidth="800px">
            <div className={classes.tableCard}>
              <CardContent sx={{ width: "100%", color: "#fff" }}>
                <DataGrid
                  // loading={isLoading || !data}
                  getRowId={(row) => row.id}
                  rows={tableData || []}
                  columns={columns}
                  style={{
                    color: "white",
                  }}
                />
              </CardContent>
            </div>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default AddDetails;
