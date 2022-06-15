import React, { useEffect, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import Contacto, { initialStateContacto } from "../../Models/Contacto";
import * as formTypes from "../../features/constants/FormVisualizationTypes";

import { useAppDispatch } from "../../app/hooks";

import * as ContactosService from "../../Services/contactosService";
import {
  addContacto,
  updateContacto,
  deleteContacto,
} from "../../features/contactos/contactosSlice";

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

  // const [disabled, setDisabled] = useState(false);
  let disabled = false;

  useEffect(() => {}, []);

  let titulo = "Datos de contacto";
  switch (modo) {
    case formTypes.CREATE:
      titulo = "Crear contacto";
      // setDisabled(false);
      disabled = false;
      break;

    case formTypes.EDIT:
      titulo = "Editar contacto";
      // setDisabled(false);
      disabled = false;

      break;

    case formTypes.DELETE:
      titulo = "Eliminar contacto";
      // setDisabled(true);
      disabled = true;

      break;

    case formTypes.VIEW:
      titulo = "Datos de contacto";
      disabled = true;
      // setDisabled(true);
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
    switch (modo) {
      case formTypes.CREATE:
        dispatch(addContacto(await ContactosService.createContacto(contacto)));
        break;

      case formTypes.EDIT:
        dispatch(updateContacto(await ContactosService.editContacto(contacto)));
        break;

      case formTypes.DELETE:
        if (contacto.id) {
          dispatch(
            deleteContacto(await ContactosService.deleteContacto(contacto.id))
          );
        }
        break;

      default:
        break;
    }
    closeModal();
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
              placeholder="Ingrese nombre"
              value={contacto.nombre || ""}
              onChange={handleChange}
              disabled={disabled}
              tabIndex={1}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="apellido">
            <Form.Label>Apellido</Form.Label>
            <Form.Control
              name="apellido"
              type="text"
              placeholder="Ingrese apellido"
              value={contacto.apellido || ""}
              onChange={handleChange}
              disabled={disabled} 
              tabIndex={2}
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
              tabIndex={3}
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
