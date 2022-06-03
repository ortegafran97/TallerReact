import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import Vehiculo, { initialStateVehiculo } from "../../Models/Vehiculo";
import Contacto, { initialState } from "../../Models/Contacto";
import * as formTypes from "../../features/constants/FormVisualizationTypes";
import * as service from "../../Services/vehiculosService";
import {
  addVehiculo,
  updateVehiculo,
  deleteVehiculo,
} from "../../features/slices/vehiculosSlice";
import {
  Button,
  Col,
  Form,
  FormControl,
  InputGroup,
  Modal,
  Row,
} from "react-bootstrap";
import { selectContactos } from "../../features/contactos/contactosSlice";
import DatosContacto from "../Contactos/DatosContacto";

interface Props {
  vehiculo: Vehiculo;
  modo: string;
  show?: boolean;
  closeModal: () => void;
  setNewVehiculo: (vehiculo: Vehiculo) => void;
}

const ModalVehiculos = ({
  vehiculo,
  show,
  modo,
  closeModal,
  setNewVehiculo,
}: Props) => {
  const [contacto, setContacto] = useState<Contacto>(initialState);
  const [nombreContacto, setNombreContacto] = useState<string>("");
  const [listaContactos, setListaContactos] = useState<Contacto[]>([]);

  const contactos = useAppSelector(selectContactos);
  const dispatch = useAppDispatch();
  let disabled = false;

  let titulo = "Datos de vehiculo";
  switch (modo) {
    case formTypes.CREATE:
      titulo = "Agregar vehiculo";
      // setDisabled(false);
      disabled = false;
      break;

    case formTypes.EDIT:
      titulo = "Editar vehiculo";
      // setDisabled(false);
      disabled = false;

      break;

    case formTypes.DELETE:
      titulo = "Eliminar vehiculo";
      // setDisabled(true);
      disabled = true;

      break;

    case formTypes.VIEW:
      titulo = "Datos de vehiculo";
      disabled = true;
      // setDisabled(true);
      break;

    default:
      titulo = "Datos de vehiculo";
      disabled = false;
      break;
  }

  const nombres: Contacto[] = [
    { nombre: "Franco", apellido: "Ortega", telefono: "" },
    { nombre: "Leda", apellido: "Lavado", telefono: "" },
    { nombre: "Andrew", apellido: "Garfield", telefono: "" },
    { nombre: "Tom", apellido: "Holland", telefono: "" },
    { nombre: "Franco", apellido: "Holland", telefono: "" },
  ];

  useEffect(() => {
    if (vehiculo.contacto) setContacto(vehiculo.contacto);

    return () => {
      setListaContactos([]);
    };
  }, []);

  /* Handlers */
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    switch (e.target.id) {
      case "inputContacto":
        setNombreContacto(e.target.value);
        break;

      default:
        setNewVehiculo({ ...vehiculo, [e.target.name]: e.target.value });
        break;
    }
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    switch (modo) {
      case formTypes.CREATE:
        const resCreate = await service.createVehiculo(vehiculo);
        if (resCreate) dispatch(addVehiculo(resCreate));
        break;

      case formTypes.EDIT:
        const resEdit = await service.editVehiculo(vehiculo);
        if (resEdit) dispatch(updateVehiculo(resEdit));
        break;

      case formTypes.DELETE:
        if (vehiculo.id) {
          dispatch(deleteVehiculo(await service.deleteVehiculo(vehiculo.id)));
        }
        break;

      default:
        break;
    }
    closeModal();
  };

  const aplicarContacto = (e: React.MouseEvent) => {
    const x = contactos.find(
      (e) => e.nombre.concat(" " + e.apellido) === nombreContacto
    );
    if (x) {
      // setContacto(x);
      setNewVehiculo({ ...vehiculo, contacto: x });
    }
  };

  return (
    <Modal show={show} onHide={closeModal}>
      <Form onSubmit={handleSubmit}>
        <Modal.Header closeButton>
          <Modal.Title>{titulo}</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Row>
            <Col>
              <Form.Group className="mb-3" controlId="marca">
                <Form.Label>Marca</Form.Label>
                <Form.Control
                  name="marca"
                  type="text"
                  placeholder="Ingrese marca"
                  value={vehiculo.marca || ""}
                  onChange={handleChange}
                  disabled={disabled}
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group className="mb-3" controlId="modelo">
                <Form.Label>Modelo</Form.Label>
                <Form.Control
                  name="modelo"
                  type="text"
                  placeholder="Ingrese modelo"
                  value={vehiculo.modelo || ""}
                  onChange={handleChange}
                  disabled={disabled}
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Group className="mb-3" controlId="patente">
                <Form.Label>Patente</Form.Label>
                <Form.Control
                  name="patente"
                  type="text"
                  placeholder="Ingrese Patente"
                  value={vehiculo.patente || ""}
                  onChange={handleChange}
                  disabled={disabled}
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group className="mb-3" controlId="anio">
                <Form.Label>Año</Form.Label>
                <Form.Control
                  name="anio"
                  type="number"
                  placeholder="Ingrese anio"
                  value={vehiculo.anio || ""}
                  onChange={handleChange}
                  disabled={disabled}
                />
              </Form.Group>
            </Col>
          </Row>

          <hr />
          <h3>Info de Contacto</h3>

          {[formTypes.EDIT, formTypes.CREATE].includes(modo) ? (
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
          ) : (
            <></>
          )}

          {vehiculo.contacto ? (
            <>
              <DatosContacto title="titulo" data={vehiculo.contacto} />
            </>
          ) : (
            <></>
          )}
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

export default ModalVehiculos;
