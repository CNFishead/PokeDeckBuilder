import { Container } from "react-bootstrap";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { useSelector } from "react-redux";
import Header from "./components/Navbar/Header";
import LoginScreen from "./Screens/LoginScreen";
import Dashboard from "./Screens/Dashboard";
import PrivateRoute from "./components/PrivateRoute";
import setAuthToken from "./utils/setAuthToken";

import "./App.css";
const App = () => {
  const { user } = useSelector((state) => state.auth);
  if (user) {
    setAuthToken(user.token);
  }
  return (
    <>
      <Router>
        <Header />
        <Container fluid>
          <Routes>
            <Route
              path="/dashboard"
              element={
                <PrivateRoute>
                  <Dashboard />
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
