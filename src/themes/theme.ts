import { createTheme } from "@mui/material/styles";

const FONT_FAMILY = [
  "-apple-system",
  "BlinkMacSystemFont",
  "'Segoe UI'",
  "Roboto",
  "'Helvetica Neue'",
  "Arial",
  "'Noto Sans'",
  "sans-serif",
  "'Apple Color Emoji'",
  "'Segoe UI Emoji'",
  "'Segoe UI Symbol'",
  "'Noto Color Emoji'",
].join(", ");

const theme = createTheme({
  typography: {
    fontFamily: FONT_FAMILY,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          fontFamily: FONT_FAMILY,
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          fontFamily: FONT_FAMILY,
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          fontFamily: FONT_FAMILY,
        },
      },
    },
  },
});

export { FONT_FAMILY };
export default theme;