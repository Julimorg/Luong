import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "./pages/main";
import HomePage from "./pages/DashBoardPage/DashBoardPage";
import AboutPage from "./pages/AboutUsPage/AboutUsPage";
import ContactPage from "./pages/ContractPage/ContractPage";
import ProjectsPage from "./pages/ProjectPage/ProjectPage";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/gioi-thieu" element={<AboutPage />} />
          <Route path="/lien-he" element={<ContactPage />} />
          <Route path="/du-an" element={<ProjectsPage />} />
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