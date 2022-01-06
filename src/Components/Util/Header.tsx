import React from "react";
import {
  Button,
  Container,
  Form,
  FormControl,
  Nav,
  Navbar,
} from "react-bootstrap";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand href="/">Mecanica Ortega</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Link className="nav-link active" aria-current="page" to="/">
              Home
            </Link>
            <Link
              className="nav-link active"
              aria-current="page"
              to="/contactos"
            >
              Contactos
            </Link>
            <Link
              className="nav-link active"
              aria-current="page"
              to="/ingresos"
            >
              Ingresos
            </Link>
            <Link
              className="nav-link active"
              aria-current="page"
              to="/vehiculos"
            >
              Vehiculos
            </Link>
            <Link className="nav-link active" aria-current="page" to="/cont">
              Contador
            </Link>
            <Link className="nav-link active" aria-current="page" to="/test">
              Test
            </Link>
            {/* <NavDropdown title="Dropdown" id="basic-nav-dropdown">
          <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
          <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
          <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
          <NavDropdown.Divider />
          <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
        </NavDropdown> */}
          </Nav>
          <Form className="d-flex">
            <FormControl
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
            />
            <Button variant="outline-success">Search</Button>
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
