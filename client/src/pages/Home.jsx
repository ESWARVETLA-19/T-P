import React from "react";
import { Box } from "@mui/material";
import Navbar from "../components/Navbars/MainNavbar";
import Footer from "../components/Footers/MainFooter";
import { Outlet, useLocation } from "react-router-dom";

const Home = () => {
  const location = useLocation();
  const NAVBAR_HEIGHT = 64;

  return (
    <div>
      <Navbar />
      <Box 
        sx={{ 
          mt: `${NAVBAR_HEIGHT + 20}px`,  // Adjusted margin-top for proper spacing
          bgcolor: "#161b2d", 
          minHeight: "100vh",
          position: "relative",
          display: "flex", 
          flexDirection: "column", // Ensures the footer stays at the bottom
        }}
      >
        <Outlet />
        {location.pathname === "/" && <Footer />} {/* Conditionally render the Footer */}
      </Box>
    </div>
  );
};

export default Home;
