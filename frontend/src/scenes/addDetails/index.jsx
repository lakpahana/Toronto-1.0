import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  CardContent,
  FormControl,
  Input,
  InputLabel,
  TextField,
  Typography,
} from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import React, { useEffect, useState } from "react";
import { makeStyles } from "@mui/styles";
import { useSaveItemsMutation, useDistinctItemsQuery } from "../../state/api";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useNavigate } from "react-router-dom";

const useStyles = makeStyles({
  cardBg: {
    minWidth: 275,
    maxWidth: "80vw",
    maxHeight: "70vh",
    minHeight: "420px",
    overflowY: "auto !important",
    background: "rgba(255, 255, 255, 0.35)",
    borderRadius: "16px",
    boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
    backdropFilter: "blur(5px)",
    "-webkit-backdrop-filter": "blur(5px)",
    border: "1px solid rgba(255, 255, 255, 0.3)",
    padding: "20px 5vw",
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

const AddDetails = () => {
  const classes = useStyles();
  const [saveItems, { data, error }] = useSaveItemsMutation();
  const { data: distinctData } = useDistinctItemsQuery();

  const [expanded, setExpanded] = useState(false);
  const [fields, setFields] = useState([]);
  const [distinctDataFields, setDistinctDataFields] = useState();
  const [date, setDate] = useState(new Date());
  let [count, setCount] = useState(0);

  const navigate = useNavigate();

  useEffect(() => {
    setDistinctDataFields(distinctData);
  }, [distinctData]);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const addField = () => {
    const newField = {
      id: fields.length + 1,
      description: "",
      location: "",
      dayTotal: "",
      item: "",
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
  const handleInputChangeInDistinctFields = (id, inputType, value) => {
    const updatedFields = distinctDataFields.map((field) =>
      field.id === id ? { ...field, [inputType]: value } : field
    );
    setDistinctDataFields(updatedFields);
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    const transformedData = Object.values(fields).map((field) => ({
      addedDate: date.toISOString(),
      id: 0,
      dayTotal: field.dayTotal || 0,
      description: field.description,
      item: field.item,
      location: field.location,
      totalToDate: 0,
      trackingUnit: "M",
    }));
    const finalData = [...distinctDataFields, ...transformedData];
    console.log(finalData);
    if (!error) {
      await saveItems(finalData);
      setFields("");
      setDistinctDataFields(finalData);
      console.log(data);
    } else {
      console.log(error);
    }
  };

  return (
    <Box className={classes.content}>
      <Box width="100%" maxWidth="800px">
        <div className={classes.cardBg}>
          <CardContent>
            <form>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={["DatePicker"]}>
                  <DatePicker
                    label={date.toISOString()}
                    onChange={(newValue) => setDate(newValue)}
                  />
                </DemoContainer>
              </LocalizationProvider>
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
                        <InputLabel sx={{ color: "#000" }}>
                          Day Total
                        </InputLabel>
                        <Input
                          size="small"
                          onChange={(e) =>
                            handleInputChangeInDistinctFields(
                              item.id,
                              "dayTotal",
                              e.target.value
                            )
                          }
                        />
                      </FormControl>
                    </AccordionDetails>
                  </Accordion>
                ))}
              {fields &&
                fields.map((field) => (
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
                          handleInputChange(
                            field.id,
                            "location",
                            e.target.value
                          )
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
              <Button variant="contained" color="primary" onClick={addField}>
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
              {count !== 0 && (
                <Button variant="contained" color="error" onClick={deleteField}>
                  Delete
                </Button>
              )}
            </Box>
          </CardContent>
        </div>
      </Box>
    </Box>
  );
};

export default AddDetails;
