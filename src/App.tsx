import React, { useEffect } from "react";
import "./App.css";
import { BrowserRouter as Router } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import AuthPage from "./pages/authPage";
import paths from "./utils/paths";
import DashboardPage from "./pages/dashboardPage";
import Cookies from "universal-cookie";

function App() {
  return (
    <Router>
      <Routes>
        <Route path={paths.authPage} element={<AuthPage />} />
        <Route path={paths.dashboardPage} element={<DashboardPage />} />
      </Routes>
    </Router>
  );
}

export default App;
