import { Button } from "@mui/material";
import React from "react";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import { Link } from "react-router-dom";
const LaunchButton = ({ sx = {}, ...props }) => {
  return (
    <Link to="/signin"><Button variant="contained" sx={{ borderRadius: 4, ...sx }} {...props}>
      Sign in
      <KeyboardArrowRightIcon />
    </Button></Link>
  );
};

export default LaunchButton;
