import React, { useEffect, useState } from "react";
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

import SectionPropietario from "./SectionPropietario";
import SectionVehiculo from "./SectionVehiculo";
import Vehiculo, { initialStateVehiculo } from "../../../Models/Vehiculo";
import Contacto, { initialState } from "../../../Models/Contacto";
import { initialStateIngreso } from "../../../Models/Ingreso";

//TODO: submit -> checkear que el vehiculo ingresado no existe y reemplazarlo caso de ser necesario

const NewIngreso = () => {
  const [vehiculoIngr, setVehiculoIngr] =
    useState<Vehiculo>(initialStateVehiculo);
  const [propietarioIngr, setPropietarioIngr] =
    useState<Contacto>(initialState);

  /* HANDLERS */
  const handleSubmit = (e: any) => {
    e.preventDefault();

    let ingreso = initialStateIngreso;
    vehiculoIngr.contacto = propietarioIngr;
    ingreso.vehiculo = vehiculoIngr;

    console.log(ingreso);
  };

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <h2>Nuevo ingreso</h2>
        <hr />
        <SectionVehiculo
          vehiculo={vehiculoIngr}
          setVehiculo={setVehiculoIngr}
        />
        <hr />
        <SectionPropietario
          propietario={propietarioIngr}
          setPropietario={setPropietarioIngr}
        />
        <hr />
        <section>
          <Button variant="success" type="submit">
            Guardar
          </Button>
          <Button variant="outline-secondary">Cancelar</Button>
        </section>
      </Form>
    </Container>
  );
};

export default NewIngreso;
