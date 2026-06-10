import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { ThemeProvider } from "@emotion/react";
import { CssBaseline } from "@mui/material";
import theme, { FONT_FAMILY } from "../themes/theme";

export default function MainLayout() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div
        className="min-h-screen bg-white"
        style={{ fontFamily: FONT_FAMILY }}
      >
        <Header />
        <main>
          <Outlet />
        </main>
        <Footer />
      </div>
    </ThemeProvider>
  );
}
