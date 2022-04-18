import React from "react";
import { Route, Routes } from "react-router-dom";
import Dashboard from "../../Screens/Dashboard/Dashboard";
import DeckBuild from "../../Screens/DeckBuild/DeckBuild";

const DashboardRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/deck/:deckId/edit" element={<DeckBuild />} />
    </Routes>
  );
};

export default DashboardRoutes;
