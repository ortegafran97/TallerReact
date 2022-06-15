import React, { useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";

import { useAppSelector } from "../../app/hooks";
import {
  addContacto,
  deleteContacto,
  selectContactos,
  getContactosAsync,
} from "../../features/contactos/contactosSlice";
import Contacto, { initialStateContacto } from "../../Models/Contacto";
import ModalContacto from "./ModalContacto";

import TableContactos from "./TableContactos";

import { CREATE, VIEW } from "../../features/constants/FormVisualizationTypes";

export function Contactos() {
  /* Redux */
  const contactos = useAppSelector(selectContactos);

  /* Modal */
  const [modalContacto, setModalContacto] = useState<Contacto>(initialStateContacto);
  const [visibleModal, setVisibleModal] = useState(false);
  const [modo, setModo] = useState(VIEW);
  const showModalContacto = (modo: string, c?: Contacto) => {
    setModalContacto(c ? c : initialStateContacto);
    setModo(modo);
    setVisibleModal(true);
  };
  const closeModal = () => setVisibleModal(false);

  return (
    <div>
      <ModalContacto
        contacto={modalContacto}
        modo={modo}
        show={visibleModal}
        closeModal={closeModal}
        setNewContacto={setModalContacto}
      />
      <Container>
        <Row>
          <Col md={10}>
            <h2>Lista de contactos</h2>
          </Col>
          <Col md={2}>
            <Button
              onClick={() => {
                showModalContacto(CREATE);
              }}
            >
              Crear contacto
            </Button>
          </Col>
        </Row>
        <Row>
          <Col md={12}>
            <TableContactos
              contactos={contactos}
              showModal={showModalContacto}
            />
          </Col>
        </Row>
      </Container>
    </div>
  );
}
