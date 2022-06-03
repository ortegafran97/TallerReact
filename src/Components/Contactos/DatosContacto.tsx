import React from "react";
import { Col, Form, Row } from "react-bootstrap";
import Contacto from "../../Models/Contacto";

interface Props {
  title: string;
  data: Contacto;
}

const DatosContacto = (props: Props) => {
  const data = props.data;
  const genericClassName = "mb-3";
  return (
    <div>
      <Form>
        <Row>
          <Col>
            <Form.Group className={genericClassName}>
              <Form.Label>Nombre</Form.Label>
              <Form.Control
                name="nombre"
                type="text"
                value={data.nombre || ""}
                disabled
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className={genericClassName}>
              <Form.Label>Apellido</Form.Label>
              <Form.Control
                name="apelido"
                type="text"
                value={data.apellido || ""}
                disabled
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Group className={genericClassName}>
              <Form.Label>Telefono</Form.Label>
              <Form.Control
                name="telefono"
                type="text"
                value={data.telefono || ""}
                disabled
              />
            </Form.Group>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default DatosContacto;
