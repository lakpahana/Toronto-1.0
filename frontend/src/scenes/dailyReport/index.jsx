import { Box, Button, CardContent } from "@mui/material";
import React, { useEffect } from "react";
import { makeStyles } from "@mui/styles";
import { DataGrid } from "@mui/x-data-grid";
import { useDistinctItemsQuery } from "../../state/api";
import { Link } from "react-router-dom";

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

const useStyles = makeStyles({
  tableCard: {
    minWidth: 275,
    width: "70%",
    height: "80vh",
    overflowY: "auto !important",
    background: "rgba(255, 255, 255, 0.35)",
    borderRadius: "16px",
    boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
    backdropFilter: "blur(5px)",
    "-webkit-backdrop-filter": "blur(5px)",
    border: "1px solid rgba(255, 255, 255, 0.3)",
    display: "flex",
    alignItems: "center",
    padding: "20px",
  },
});

const DailyReport = () => {
  const classes = useStyles();

  const { data, isLoading, refetch } = useDistinctItemsQuery();

  useEffect(() => {
    refetch();
  }, [refetch]);

  return (
    <Box
      width="100%"
      height="calc(100% - 80px)"
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <div className={classes.tableCard}>
        <CardContent sx={{ width: "100%", color: "#fff", height: "90%" }}>
          <Box width="100%" display="flex" justifyContent="end" mb="3rem">
            <Link to="/add-details">
              <Button variant="contained" color="secondary">
                Add Today Data
              </Button>
            </Link>
          </Box>
          <Box height="calc(100% - 80px)" sx={{ overflowY: "auto" }}>
            <DataGrid
              loading={isLoading || !data}
              getRowId={(row) => row.id}
              rows={data || []}
              columns={columns}
              style={{
                color: "white",
              }}
            />
          </Box>
        </CardContent>
      </div>
    </Box>
  );
};

export default DailyReport;
