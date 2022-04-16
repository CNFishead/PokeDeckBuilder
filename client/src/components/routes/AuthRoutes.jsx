import React from "react";
import { Route, Routes } from "react-router-dom";
import LoginScreen from "../../Screens/LoginScreen";

function authRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<LoginScreen />} />
    </Routes>
  );
}

export default authRoutes;
