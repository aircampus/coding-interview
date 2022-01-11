import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navigation from "../components/Navigation";
import OfficerPage from "../pages/OfficerPage";
import ReportPage from "../pages/ReportPage";

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigation />}>
        <Route path="/police" element={<OfficerPage />} />
        <Route path="/" element={<ReportPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
export default Router;