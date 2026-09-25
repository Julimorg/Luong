import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { ThemeProvider } from "@emotion/react";
import { CssBaseline } from "@mui/material";
import theme, { FONT_FAMILY } from "../themes/theme";
import ReactQueryProvider from "../provider/ReactQueryProvider";
import { SiteStatusGate } from "../components/SiteStatusGate";
import ScrollToTop from "../hooks/useScrollToTop";

/**
 * Khung chung của mọi trang. Trước đây các provider nằm trong App.tsx bọc
 * ngoài router; từ khi chuyển sang vite-react-ssg thì router do thư viện
 * dựng, nên provider chuyển vào đây — là phần tử gốc của cây route.
 */
export default function MainLayout() {
  return (
    <SiteStatusGate>
      <ReactQueryProvider>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <ScrollToTop />
          <div className="min-h-screen bg-white" style={{ fontFamily: FONT_FAMILY }}>
            <Header />
            <main>
              <Outlet />
            </main>
            <Footer />
          </div>
          <ToastContainer
            theme="light"
            position="top-right"
            autoClose={3000}
            closeOnClick
            pauseOnHover={false}
          />
        </ThemeProvider>
      </ReactQueryProvider>
    </SiteStatusGate>
  );
}
