import React from "react";
import { Routes, Route, useLocation, BrowserRouter } from "react-router-dom";
import "./App.css";
import Login from "./components/login/Login";
import SignUp from "./components/signup/SignUp";
import Dashboard from "./components/dashboard/Dashboard";

const AppContent = () => {
  const location = useLocation();

  return (
    <div className="app-container">
      <div className="content">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </div>
    </div>
  );
};
function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;
