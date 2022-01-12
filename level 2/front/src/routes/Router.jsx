import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "../App";
import Officer from "../pages/Officer";
import Report from "../pages/Report";

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/report" element={<Report />} />
        <Route path="/officer" element={<Officer />} />
      </Routes>
    </BrowserRouter>
  );
}
export default Router;