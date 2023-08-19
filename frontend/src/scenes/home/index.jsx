import { Box, Link, Typography } from "@mui/material";
import React from "react";
import profileImage from "../../assets/building.jpg";

const Home = () => {
  return (
    <Box
      width="100vw"
      height="100vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
      sx={{
        backgroundImage: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url(${profileImage})`,
        backgroundSize: "cover",
      }}
    >
      <Box
        width="100vw"
        height="50vh"
        display="flex"
        alignItems="center"
        justifyContent="center"
        flexDirection="column"
        sx={{
          backgroundColor: `rgba(255,255,255,0.2);`,
        }}
      >
        <Typography
          fontWeight="bold"
          fontSize="5.85rem"
          sx={{ color: "white" }}
        >
          TORONTO
        </Typography>
        <Box display="flex" gap="1rem">
          {/* <Box borderRight="5px solid #fff" p="0 1rem 0 0">
            <Link
              href="/add-details"
              fontWeight="bold"
              fontSize="1.85rem"
              sx={{ color: "white" }}
            >
              Add Details
            </Link>
          </Box> */}
          <Box>
            <Link
              href="/daily-report"
              fontWeight="bold"
              fontSize="1.85rem"
              sx={{ color: "white" }}
            >
              Daily Reports
            </Link>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Home;
