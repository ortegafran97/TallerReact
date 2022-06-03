import React from "react";
import { Col, Dropdown, Form, InputGroup, Row } from "react-bootstrap";
import { Search } from "react-bootstrap-icons";

const SectionVehiculo = () => {
  return (
    <Row>
      <Row>
        <h3> Datos de vehiculo</h3>
      </Row>
      <Row>
        <Col>
          <span>Vehiculo</span>
          <Form.Group>
            <Form.Label>Id</Form.Label>
            <Form.Control name="id" type="text" placeholder="" disabled />
          </Form.Group>
          <Form.Group>
            <Form.Label>Patente</Form.Label>
            <Form.Control
              name="patente"
              type="text"
              placeholder="Ingrese patente"
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Marca</Form.Label>
            <Form.Control
              name="patente"
              type="text"
              placeholder="Ingrese patente"
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Modelo</Form.Label>
            <Form.Control
              name="patente"
              type="text"
              placeholder="Ingrese patente"
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Año</Form.Label>
            <Form.Control
              name="patente"
              type="number"
              placeholder="Ingrese patente"
            />
          </Form.Group>
        </Col>
        <Col>
          <span>Buscar vehiculo ya existente</span>
          <InputGroup>
            <Form.Control
              autoFocus
            //   className="w-100 mb-3 filtro"
              id="filtroVehiculos"
              placeholder="Buscar por patente, marca o modelo..."
              // onChange={(e) => setValue(e.target.value)}
              // value={value}
            />
            <InputGroup.Text>
              <Search />
            </InputGroup.Text>
          </InputGroup>
          <Dropdown.Menu show style={{ width: "47.5%" /*, marginTop: "2em"*/ }}>
            <Dropdown.Item
              eventKey="1"
              className="mb-2 itemVehiculoNewIngreso"
              // onClick={()=>{}}
            >
              <Row>
                <Col>
                  <span className="modelo">Suran</span>
                </Col>
                <Col>
                  <span className="marca">VW</span>
                </Col>
              </Row>
              <Row>
                <Col>
                  <span className="patente">ODJ 258</span>
                </Col>
              </Row>
            </Dropdown.Item>
            <Dropdown.Item eventKey="2" className="mb-2 itemVehiculoNewIngreso">
              Second
            </Dropdown.Item>
            <Dropdown.Item eventKey="3" className="mb-2 itemVehiculoNewIngreso">
              third
            </Dropdown.Item>
            <Dropdown.Item eventKey="4" className="mb-2 itemVehiculoNewIngreso">
              forth
            </Dropdown.Item>
          </Dropdown.Menu>
        </Col>
      </Row>
    </Row>
  );
};

export default SectionVehiculo;
