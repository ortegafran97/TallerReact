import React from "react";
import {
  Col,
  Container,
  Dropdown,
  Form,
  InputGroup,
  Row,
} from "react-bootstrap";
import {Search} from "react-bootstrap-icons";

const SectionPropietario = () => {
  return (
    <Container style={{ width: "100%" }}>
      <Row>
        <Row>
          <h3> Datos de Contacto</h3>
        </Row>
        <Row>
          {/* Datos del contacto */}
          <Col>
            <span>Contacto</span>
            <Form.Group>
              <Form.Label>Id</Form.Label>
              <Form.Control disabled></Form.Control>
            </Form.Group>
            <Form.Group>
              <Form.Label>Nombre</Form.Label>
              <Form.Control></Form.Control>
            </Form.Group>
            <Form.Group>
              <Form.Label>Apellido</Form.Label>
              <Form.Control></Form.Control>
            </Form.Group>
            <Form.Group>
              <Form.Label>Telefono</Form.Label>
              <Form.Control></Form.Control>
            </Form.Group>
          </Col>
          {/* Listado + buscador de contacto */}
          <Col>
            <InputGroup>
              <Form.Control placeholder="Buscar persona por nombre, apellido o telefono..." />
              <InputGroup.Text>
                <Search />
              </InputGroup.Text>
            </InputGroup>
            <Dropdown.Menu
              show
              style={{ width: "47.5%" /*, marginTop: "2em"*/ }}
            >
              <Dropdown.Item>
                <Row>
                  <Col>Franco</Col>
                  <Col>Ortega</Col>
                </Row>
                <Row>
                  <Col>07070708</Col>
                </Row>
              </Dropdown.Item>
              <Dropdown.Item>
                <Row>
                  <Col>Eya</Col>
                  <Col>Peppers</Col>
                </Row>
                <Row>
                  <Col></Col>
                </Row>
              </Dropdown.Item>
              <Dropdown.Item>
                <Row>
                  <Col>User</Col>
                  <Col>Test</Col>
                </Row>
                <Row>
                  <Col>0303456</Col>
                </Row>
              </Dropdown.Item>
            </Dropdown.Menu>
          </Col>
        </Row>
      </Row>
    </Container>
  );
};

export default SectionPropietario;
