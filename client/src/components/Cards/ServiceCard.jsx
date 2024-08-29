import { Box, Stack, Typography } from "@mui/material";
import React from "react";
import OutlinedButton from "../Buttons/OutlinedButton";
import Title from "../Title";
import { Link } from "react-router-dom";

const ServiceCard = ({ title = "", subtitle, image, index }) => {
  const cleanTitle = title.trim();

  return (
    <Box
      sx={{
        height: "80%",
        position: "relative",
        p: 4,
        borderRadius: "30px",
        "&::before": {
          content: '""',
          position: "absolute",
          inset: 0,
          borderRadius: "30px",
          border: "1px solid transparent",
          background: "linear-gradient(120deg,#5f5f61,transparent) border-box",
          WebkitMask:
            "linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0)",
          WebkitMaskComposite: "xor",
          maskComposite: "exclude",
        },
      }}
    >
      <Stack sx={{ height: "100%" }} spacing={1}>
        <Title variant={{ xs: "h5", sm: "h4" }}>{title}</Title>

        <Typography variant="body2" color="text.secondary">
          {subtitle}
        </Typography>

        <img
          src={image}
          alt=""
          style={{
            height: "200px",
            width: "100%",
            objectFit: "contain",
            flex: 1,
            margin: "10px",
          }}
        />

        <Link to={
          index === 2 ? "/jobs" : 
          cleanTitle === "Exam Data Reports" ? "/team" : 
          "/drives"
        }>
          <OutlinedButton>View More</OutlinedButton>
        </Link>
      </Stack>
    </Box>
  );
};

export default ServiceCard;
