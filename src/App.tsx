import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "./pages/main";
import HomePage from "./pages/DashBoardPage/DashBoardPage";
import AboutPage from "./pages/AboutUsPage/AboutUsPage";
import ContactPage from "./pages/ContractPage/ContractPage";
import ProjectsPage from "./pages/ProjectPage/ProjectPage";
import ProductPage from "./pages/ProductPage/ProductPage";
import ProjectDetailPage from "./pages/ProjectDetailPage/ProjectDetailPage";
import SolutionPage from "./pages/SolutionPage/SolutionPage";
import ScrollToTop from "./hooks/useScrollToTop";
import ProductDetailPage from "./pages/ProductDetailPage/ProductDetailPage";

const App: React.FC = () => {
  return (
    <BrowserRouter>
     <ScrollToTop /> 
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/gioi-thieu" element={<AboutPage />} />
          <Route path="/lien-he" element={<ContactPage />} />
          <Route path="/du-an" element={<ProjectsPage />} />
          <Route path="/san-pham" element={<ProductPage />} />
          <Route path="/du-an/:id" element={<ProjectDetailPage />} />
          <Route path="/giai-phap" element={<SolutionPage />} />
          <Route path="/san-pham/:id" element={<ProductDetailPage />} />
          {/* Thêm pages mới vào đây, Header vẫn hiển thị */}
          {/* <Route path="/du-an" element={<ProjectsPage />} /> */}
          {/* <Route path="/dich-vu" element={<ServicesPage />} /> */}
          {/* <Route path="/lien-he" element={<ContactPage />} /> */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;