import { createTheme } from "@mui/material/styles";

// Create a theme instance.
const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#127afe",
    },
    secondary: {
      main: "#ffffff",
      light: "#ffffff5c",
    },
    background: {
      // paper: "#282f30",
      paper: "#202020",
    },
  },
});

export default theme;
