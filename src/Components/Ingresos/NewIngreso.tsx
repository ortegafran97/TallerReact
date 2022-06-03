import React from "react";
import {
  Button,
  Card,
  Col,
  Container,
  Dropdown,
  Form,
  FormGroup,
  Row,
} from "react-bootstrap";
import SectionPropietario from "./NewIngreso/SectionPropietario";
import SectionVehiculo from "./NewIngreso/SectionVehiculo";

//TODO: cargar vehiculos
//TODO: cargar contactos

const NewIngreso = () => {
  return (
    <Container>
      <Form>
        <h2>Nuevo ingreso</h2>
        <hr />
        <SectionVehiculo />
        <hr />
        <SectionPropietario />
        <hr />
        <section>
          <Button variant="success">Guardar</Button>
          <Button variant="outline-secondary">Cancelar</Button>
        </section>
      </Form>
    </Container>
  );
};

export default NewIngreso;
