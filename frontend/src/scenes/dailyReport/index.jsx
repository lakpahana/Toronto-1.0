import { Box, CardContent } from "@mui/material";
import React from "react";
import { makeStyles } from "@mui/styles";
import { DataGrid } from "@mui/x-data-grid";
import { useDistinctItemsQuery } from "../../state/api";

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
    maxHeight: "80vh",
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
    padding: "20px",
  },
});

const DailyReport = () => {
  const classes = useStyles();

  const { data, isLoading } = useDistinctItemsQuery();

  return (
    <Box width="100%" height="calc(100% - 80px)" display="flex" alignItems="center" justifyContent="center">
          <div className={classes.tableCard}>
            <CardContent sx={{ width: "100%", color: "#fff" }}>
              <DataGrid
                loading={isLoading || !data}
                getRowId={(row) => row.id}
                rows={data || []}
                columns={columns}
                style={{
                  color: "white",
                }}
              />
            </CardContent>
          </div>
    </Box>
  );
};

export default DailyReport;
