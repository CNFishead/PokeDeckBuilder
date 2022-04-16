import React from "react";
import { Routes } from "react-router-dom";
import AdminScreen from "../../Screens/Admin/AdminScreen";

const AdminRoutes = ({ match }) => {
  return (
    <Routes>
      <Route
        path={match.url + "/admin-panel/:view"}
        component={AdminScreen}
        exact
      />
      <Route path={match.url + "/admin-panel"} component={AdminScreen} exact />
    </Routes>
  );
};

export default AdminRoutes;
