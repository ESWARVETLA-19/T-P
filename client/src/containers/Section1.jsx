import { Box, Container, useTheme } from "@mui/material";
import React from "react";
import { section1Content } from "../utils/content";
import useMeasure from "react-use-measure";
import hero from "../assets/images/hero.jpg";

const { MainBG } = section1Content;

const Section1 = () => {
  const theme = useTheme();
  const [ref] = useMeasure();

  return (
    <Box sx={{ width: "100%", position: "relative" , bottom : "35px"}}>
      {/* Main Background Image */}
      <Box
        sx={{
          position: "absolute",
          zIndex: 0,
          top: 0,
          left: 0,
          right: 0,
          overflow: "hidden",
        }}
      >
        <img
          src={hero}
          alt="hero"
          style={{ width: "100%", height: "40rem", objectFit: "cover" }}
        />
      </Box>

      {/* Background Elements */}
      <Box
        ref={ref}
        sx={{
          position: "absolute",
          width: "100%",
          zIndex: -1,
          top: 0,
          left: 0,
          right: 0,
        }}
      >
        <img src={MainBG} alt="main" style={{ width: "100%", opacity: 0 }} />

        <Box
          sx={{
            bgcolor: "background.default",
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
          }}
        ></Box>
      </Box>

      {/* Content */}
      <Container
        sx={{
          height: "80vh",
          mt: 4,  
          [theme.breakpoints.up("md")]: { mt: 3 }, 
        }}
      >

      </Container>
    </Box>
  );
};

export default Section1;
