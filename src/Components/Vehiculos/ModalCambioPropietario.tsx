import React, { useState } from "react";
import {
  Col,
  Form,
  FormControl,
  FormGroup,
  InputGroup,
  Modal,
  Row,
  Button,
} from "react-bootstrap";
import { selectContactos } from "../../features/contactos/contactosSlice";
import Contacto, { initialStateContacto } from "../../Models/Contacto";
import Vehiculo from "../../Models/Vehiculo";
import DatosContacto from "../Contactos/DatosContacto";
import * as service from "../../Services/vehiculosService";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { updateVehiculo } from "../../features/slices/vehiculosSlice";

interface Props {
  vehiculo: Vehiculo;
  show?: boolean;
  closeModal: () => void;
}

const ModalCambioPropietario = ({ vehiculo, show, closeModal }: Props) => {
  const oldContacto = vehiculo.contacto;
  const contactos = useAppSelector(selectContactos);
  const dispatch = useAppDispatch();

  /* States */
  const [nombreContacto, setNombreContacto] = useState<string>("");
  const [newPropietario, setNewPropietario] = useState<Contacto>(initialStateContacto);

  /* Handlers */
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    switch (e.target.id) {
      case "inputContacto":
        setNombreContacto(e.target.value);
        break;
    }
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const newV: Vehiculo = { ...vehiculo, contacto: newPropietario };
    const resEdit = await service.editVehiculo(newV);
    // const resEdit = await service.editVehiculo(vehiculo);
    if (resEdit) {
      dispatch(updateVehiculo(resEdit));
      setNombreContacto("");
      setNewPropietario(initialStateContacto);
      closeModal();
    }
  };

  /* Custom functions */
  const aplicarContacto = (e: React.MouseEvent) => {
    const x = contactos.find(
      (e) => e.nombre.concat(" " + e.apellido) === nombreContacto
    );
    if (x) setNewPropietario(x);
  };

  if (oldContacto) {
    return (
      <Modal show={show} onHide={closeModal}>
        <Form onSubmit={handleSubmit}>
          <Modal.Header closeButton>
            <Modal.Title>Cambiar Propietario</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <DatosContacto title="Datos de propietario" data={oldContacto} />

            <hr />
            <h3>Nuevo propietario</h3>

            <div>
              <InputGroup>
                <FormControl
                  list="contactos"
                  id="inputContacto"
                  onChange={handleChange}
                  value={nombreContacto}
                />
                <Button
                  variant="outline-warning"
                  id="btAplicarContacto"
                  onClick={aplicarContacto}
                >
                  Aplicar
                </Button>
                <datalist id="contactos">
                  {contactos.map((i) => {
                    return (
                      <option key={i.id}>
                        {i.nombre} {i.apellido}
                      </option>
                    );
                  })}
                </datalist>
              </InputGroup>
            </div>

            <DatosContacto title="Nuevo propietario" data={newPropietario} />
          </Modal.Body>
          <Modal.Footer>
            <Button variant="warning" type="submit">
              Editar
            </Button>
            <Button
              variant="secondary"
              onClick={() => {
                setNombreContacto("");
                setNewPropietario(initialStateContacto);
                closeModal();
              }}
            >
              Cerrar
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    );
  } else {
    return (
      <Modal>
        <Modal.Header closeButton>Error al mostrar los datos</Modal.Header>
        <Modal.Body></Modal.Body>
        <Modal.Footer></Modal.Footer>
      </Modal>
    );
  }
};

export default ModalCambioPropietario;
