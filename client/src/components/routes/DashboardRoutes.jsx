import React from "react";
import { Route, Routes } from "react-router-dom";
import Dashboard from "../../Screens/Dashboard/Dashboard";
import DeckEdit from "../../Screens/Deck/DeckEdit";
import DeckBuild from "../../Screens/DeckBuild/DeckBuild";
import Preview from "../../Screens/Preview";

const DashboardRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="deck/preview" element={<Preview />} />
      <Route path="/deck/:deckId/edit" element={<DeckEdit />} />
    </Routes>
  );
};

export default DashboardRoutes;
