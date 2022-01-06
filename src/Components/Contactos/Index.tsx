import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";

import { useAppSelector, useAppDispatch } from "../../app/hooks";
import {
  addContacto,
  deleteContacto,
  selectContactos,
  getContactosAsync,
} from "../../features/contactos/contactosSlice";
import Contacto, { initialState } from "../../Models/Contacto";
import ModalContacto from "./ModalContacto";

import TableContactos from "./TableContactos";

import { CREATE } from "../../features/constants/FormVisualizationTypes";

export function Contactos() {
  /* Redux */
  const contactos = useAppSelector(selectContactos);
  const dispatch = useAppDispatch();

  /* Modal */
  const [modalContacto, setModalContacto] = useState<Contacto>(initialState);
  const [visibleModal, setVisibleModal] = useState(false);
  const [modo, setModo] = useState("view");
  const showModalContacto = (c: Contacto, modo: string) => {
    setModalContacto(c);
    setModo(modo);
    setVisibleModal(true);
  };
  const closeModal = () => setVisibleModal(false);

  /* Carga CONTACTOS al inicio */
  useEffect(() => {
    dispatch(getContactosAsync(contactos));
  }, []);

  return (
    <div>
      <TableContactos contactos={contactos} showModal={showModalContacto} />
      <ModalContacto
        contacto={modalContacto}
        modo={modo}
        show={visibleModal}
        closeModal={closeModal}
        setNewContacto={setModalContacto}
      />

      <Button
        onClick={() => {
          showModalContacto(initialState, CREATE);
        }}
      >
        Crear contacto
      </Button>
    </div>
  );
}
