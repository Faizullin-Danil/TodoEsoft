import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header/Header";
import { Box } from "@mui/material";

const Layout = () => {
  return (
    <Box>
      <Header />
      <Box
        sx={{
          display: 'flex',
          mt: '70px',
          minWidth: '100%',
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <Outlet />
      </Box>
      {/* <Footer /> */}
    </Box>
  );
};

export default Layout;
