import { Container } from "react-bootstrap";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { useSelector } from "react-redux";
import Header from "./components/Navbar/Header";
import LoginScreen from "./Screens/LoginScreen";
import PrivateRoute from "./components/PrivateRoute";
import setAuthToken from "./utils/setAuthToken";

import "./App.css";
import DashboardRoutes from "./components/routes/DashboardRoutes";
import Alert from "./components/Alert";
const App = () => {
  const { user } = useSelector((state) => state.auth);
  if (user) {
    setAuthToken(user.token);
  }
  return (
    <>
      <Router>
        <Alert />
        <Header />
        <Container fluid>
          <Routes>
            <Route
              path="/dashboard/*"
              element={
                <PrivateRoute>
                  <DashboardRoutes />
                </PrivateRoute>
              }
            />
            <Route path="/" element={<LoginScreen />} />
          </Routes>
        </Container>
      </Router>
    </>
  );
};

export default App;
