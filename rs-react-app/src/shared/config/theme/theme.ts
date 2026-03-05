import { createTheme } from '@mui/material/styles';
import { COLORS } from './palette';

export const theme = createTheme({
  typography: {
    fontFamily: 'Montserrat, sans-serif',
  },
  palette: {
    mode: 'dark',
    background: {
      default: COLORS.bg,
      paper: COLORS.bg,
    },
  },
});
