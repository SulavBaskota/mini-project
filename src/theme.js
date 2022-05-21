import { createTheme } from '@mui/material/styles';
import { red } from '@mui/material/colors';

// Create a theme instance.
const theme = createTheme({
  palette: {
    primary: {
      main: '#045256',
    },
    secondary: {
      main: '#0B1516',
    },
    background: {
      default: '#9AB8BA',
      paper: '#DDF7F8'
    },
    error: {
      main: red.A400,
    },
  },
});

export default theme;
