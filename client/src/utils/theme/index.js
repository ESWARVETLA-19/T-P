import { createTheme } from "@mui/material";
import typography from "./typography";

const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#2f8af5",
    },
    background: {
      default: "#161b2d",
    },
    text: {
      secondary: "rgba(255, 255, 255, 0.6)",
    },
  },
  typography,
});

export default theme;
