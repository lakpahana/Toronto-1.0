import { Box, Link, Typography } from "@mui/material";
import React from "react";
import { Outlet } from "react-router-dom";
import formBg from "../../assets/business-bg3.jpg";

const Layout = () => {
  return (
    <Box
      width="100vw"
      height="100vh"
      sx={{
        background: `linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.3)), url(${formBg})`,
        backgroundSize: "cover",
      }}
    >
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        p="2rem 5rem 0 5rem"
      >
        <Typography variant="h4" color="white">
          TORONTO
        </Typography>
        <Box display="flex" alignItems="center" gap="2rem">
          <Link sx={{ color: "white" }} href="/">
            HOME
          </Link>
          <Link sx={{ color: "white" }} href="/add-details">
            ADD DETAILS
          </Link>
          <Link sx={{ color: "white" }} href="/daily-report">
            DAILY REPORTS
          </Link>
        </Box>
      </Box>
      <Outlet />
    </Box>
  );
};

export default Layout;
