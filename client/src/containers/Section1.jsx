import {
  Box,
  Container,
  useTheme,
} from "@mui/material";
import React from "react";
import { section1Content } from "../utils/content";
import useMeasure from "react-use-measure";
import hero from "../assets/images/herovideo.mp4";

const {
  MainBG,
} = section1Content;



const Section1 = () => {
  const theme = useTheme();
  // const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));

  const [ref, { height }] = useMeasure();

  return (
    <Box sx={{ width: "100%", position: "relative" }}>
      {/* Main Background Video */}
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
        <video
          src={hero}
          autoPlay
          loop
          muted
          playsInline
          style={{ width: "100%", height: "40rem", objectFit: "cover" }}
        />
      </Box>

      {/* backgrounds elements */}
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
            height: "800px",
            top: `calc(${height}px - 13%)`,
          }}
        ></Box>
      </Box>

      {/* Content */}
      <Container
        sx={{
          height: "80vh",
          mt: 8,
          [theme.breakpoints.up("md")]: { mt: 6 },
        }}
      >
        {/* <Stack
          sx={{ height: "100%", position: "relative" }}
          justifyContent="center"
        >
          <Title
            variant={{ xs: "h3", sm: "h2", md: "h1" }}
            sx={{ letterSpacing: "0.02em", mb: 1 }}
          >
            {title}
          </Title>

          <Title
            variant={{ xs: "h4", sm: "h3", md: "h2" }}
            sx={{ fontWeight: 500, letterSpacing: "0.05em", mb: 5 }}
          >
            {subtitle}
          </Title>

          <Stack
            direction={{ xs: "column", md: "row" }}
            alignItems="center"
            spacing={4}
          >
            <LaunchButton
              fullWidth={isSmallScreen}
              sx={{ height: 58, px: 3 }}
            />
          </Stack>
        </Stack> */}
      </Container>
    </Box>
  );
};

export default Section1;
