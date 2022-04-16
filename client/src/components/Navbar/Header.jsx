import React, { useEffect } from "react";
import { Container, Navbar, Nav, NavDropdown, Image } from "react-bootstrap";
import { FaUserAlt } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
// import { getLogo } from "../../actions/Admin/Logo/getLogo";
import { Link } from "react-router-dom";
import { logout } from "../../actions/Auth/logout";

// css
import "./index.css";

const Header = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  // const { logo } = useSelector((state) => state.dynamic);

  const logoutHandler = () => {
    dispatch(logout());
  };
  useEffect(() => {
    // dispatch(getLogo());
  }, [dispatch]);

  return (
    <header>
      <Navbar expand="lg" variant="dark" collapseOnSelect className="navbar">
        <Container fluid>
          <Link to="/dashboard">
            <Navbar.Brand>
              <span>
                <Image
                  // src={logo.value}
                  src={"/images/sample.jpg"}
                  style={{ maxWidth: "400px", maxHeight: "100px", padding: '2%' }}
                  fluid
                />
              </span>
            </Navbar.Brand>
          </Link>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse
            id="basic-navbar-nav"
            style={{ justifyContent: "end" }}
          >
            <Nav className="nav-items">
              <div className="text-end">
                {user ? (
                  <NavDropdown title={user.name} id="username" className="">
                    <Link to="/profile">
                      <NavDropdown.Item>
                        <span>Profile</span>
                      </NavDropdown.Item>
                    </Link>
                    <NavDropdown.Item onClick={logoutHandler}>
                      Logout
                    </NavDropdown.Item>
                  </NavDropdown>
                ) : (
                  <Link to="/">
                    <FaUserAlt /> Sign-In
                  </Link>
                )}
              </div>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
