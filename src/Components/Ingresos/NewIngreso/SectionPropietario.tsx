import React, { useState } from "react";
import { Col, Container, Form, InputGroup, Row } from "react-bootstrap";
import { Search } from "react-bootstrap-icons";
import { useAppSelector } from "../../../app/hooks";
import { selectContactos } from "../../../features/contactos/contactosSlice";
import Contacto, { initialState } from "../../../Models/Contacto";

interface Props {
  propietario: Contacto;
  setPropietario: (p: Contacto) => void;
}

const SectionPropietario = ({ propietario, setPropietario }: Props) => {
  const list = useAppSelector(selectContactos);

  /* STATES */
  const [filteredList, setFilteredList] = useState<Contacto[]>(list);

  /* DATA LOADER */
  function nombresDL() {
    let items: string[] = Array.from(
      new Set(
        filteredList.map((m) => {
          return m.nombre;
        })
      )
    );
    items = items.filter((i) => i !== undefined && i !== null);

    return items.map((i) => {
      return <option key={i}>{i}</option>;
    });
  }
  function apellidosDL() {
    let items: string[] = Array.from(
      new Set(
        filteredList.map((m) => {
          return m.apellido;
        })
      )
    );
    items = items.filter((i) => i !== undefined && i !== null);
    return items.map((i) => {
      return <option key={i}>{i}</option>;
    });
  }

  /* HANDLERS */
  const handleChange = (e: any) => {
    const newProp = {
      ...propietario,
      [e.target.name]: e.target.value,
    };
    setPropietario(newProp);
  };

  return (
    <>
      {/* DATALISTS */}
      <datalist id="nombres">{nombresDL()}</datalist>
      <datalist id="apellidos">{apellidosDL()}</datalist>

      {/* BODY */}
      <Row>
        <Col>Datos de Propietario</Col>
      </Row>
      <Row>
        <Col>
          <span>Contacto</span>
          <Form.Group>
            <Form.Label>Id</Form.Label>
            <Form.Control disabled></Form.Control>
          </Form.Group>
          <Form.Group>
            <Form.Label>Nombre</Form.Label>
            <Form.Control
              list="nombres"
              name="nombre"
              type="text"
              placeholder=""
              value={propietario.nombre ?? ""}
              onChange={handleChange}
            ></Form.Control>
          </Form.Group>

          <Form.Group>
            <Form.Label>Apellido</Form.Label>
            <Form.Control
              list="apellidos"
              name="apellido"
              type="text"
              placeholder=""
              value={propietario.apellido ?? ""}
              onChange={handleChange}
            ></Form.Control>
          </Form.Group>

          <Form.Group>
            <Form.Label>Telefono</Form.Label>
            <Form.Control
              name="telefono"
              type="text"
              placeholder=""
              value={propietario.telefono ?? ""}
              onChange={handleChange}
            ></Form.Control>
          </Form.Group>
        </Col>
      </Row>
    </>
  );
};

export default SectionPropietario;
