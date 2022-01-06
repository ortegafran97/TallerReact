import React, { useEffect, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import Contacto, { initialState } from "../../Models/Contacto";
import * as formTypes from "../../features/constants/FormVisualizationTypes";

import { useAppDispatch } from "../../app/hooks";

import {
  createContacto,
  editContacto,
  deleteContacto,
} from "../../Services/contactosService";
import { addContacto } from "../../features/contactos/contactosSlice";

/** Este modal va a ser reutilizable para:
 * Ver
 * Editar
 * Eliminar
 */

interface Props {
  contacto: Contacto;
  modo: string;
  show?: boolean;
  closeModal: () => void;
  setNewContacto: (contacto: Contacto) => void;
}

const ModalContacto = ({
  show,
  contacto,
  modo,
  closeModal,
  setNewContacto,
}: Props) => {
  const dispatch = useAppDispatch();

  useEffect(() => {}, []);

  let titulo = "Datos de contacto";
  let disabled = false;
  switch (modo) {
    case formTypes.CREATE:
      titulo = "Crear contacto";
      break;

    case formTypes.EDIT:
      titulo = "Editar contacto";
      break;

    case formTypes.DELETE:
      titulo = "Eliminar contacto";
      disabled = true;
      break;

    case formTypes.VIEW:
      titulo = "Datos de contacto";
      disabled = true;
      break;

    default:
      titulo = "Datos de contacto";
      break;
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewContacto({ ...contacto, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: any) => {
      e.preventDefault();
    console.log(
      `HANDLE SUBMIT \n modo:${modo} \n contacto: ${contacto.apellido}, ${contacto.id},${contacto.nombre},${contacto.telefono}, `
    );

    switch (modo) {
      case formTypes.CREATE:
        const nuevo = await createContacto(contacto);
        console.log(`nuevo contacto ${nuevo}`);
        dispatch(addContacto(nuevo));

        break;

      case formTypes.EDIT:
        break;

      case formTypes.DELETE:
        break;

      case formTypes.VIEW:
        break;

      default:
        break;
    }
  };

  return (
    <Modal show={show} onHide={closeModal}>
      <Form onSubmit={handleSubmit}>
        <Modal.Header closeButton>
          <Modal.Title>{titulo}</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form.Group className="mb-3" controlId="nombre">
            <Form.Label>Nombre</Form.Label>
            <Form.Control
              name="nombre"
              type="text"
              placeholder="Enter email"
              value={contacto.nombre || ""}
              onChange={handleChange}
              disabled={disabled}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="apellido">
            <Form.Label>Apellido</Form.Label>
            <Form.Control
              name="apellido"
              type="text"
              placeholder="Ingrese nombre"
              value={contacto.apellido || ""}
              onChange={handleChange}
              disabled={disabled}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="telefono">
            <Form.Label>Telefono</Form.Label>
            <Form.Control
              name="telefono"
              type="text"
              placeholder="Ingrese teléfono"
              value={contacto.telefono || ""}
              onChange={handleChange}
              disabled={disabled}
            />
          </Form.Group>
        </Modal.Body>

        <Modal.Footer>
          {modo === formTypes.CREATE ? (
            <Button variant="success" type="submit">
              Crear
            </Button>
          ) : (
            <></>
          )}
          {modo === formTypes.EDIT ? (
            <Button variant="warning" type="submit">
              Editar
            </Button>
          ) : (
            <></>
          )}
          {modo === formTypes.DELETE ? (
            <Button variant="danger" type="submit">
              Eliminar
            </Button>
          ) : (
            <></>
          )}
          <Button variant="secondary" onClick={() => closeModal()}>
            Cerrar
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default ModalContacto;
