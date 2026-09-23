import { createTheme } from "@mui/material/styles";
import { FONT_FAMILY, GOLD, GOLD_DARK, NAVY, WHITE } from "./brand";

// MUI dùng chung font Roboto và bảng màu thương hiệu với phần Tailwind.
const theme = createTheme({
  palette: {
    primary: { main: GOLD, dark: GOLD_DARK, contrastText: WHITE },
    secondary: { main: NAVY, contrastText: WHITE },
    background: { default: WHITE },
  },
  typography: {
    fontFamily: FONT_FAMILY,
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: { fontFamily: FONT_FAMILY, backgroundColor: WHITE },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: { fontFamily: FONT_FAMILY },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: { fontFamily: FONT_FAMILY },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: { fontFamily: FONT_FAMILY },
      },
    },
  },
});

export { FONT_FAMILY };
export default theme;
