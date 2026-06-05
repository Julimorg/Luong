import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/DashBoardPage/HomePage";
import MainLayout from "./pages/main";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<HomePage />} />
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