import React, { useEffect, useState } from "react";
import { useAppDispatch } from "../../app/hooks";
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
  Dropdown,
  Form,
  FormControl,
  InputGroup,
  Modal,
  Row,
} from "react-bootstrap";
import DropdownMenu from "react-bootstrap/esm/DropdownMenu";

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
  const [contacto, setContacto] = useState(initialState);
  const dispatch = useAppDispatch();
  let disabled = false;

  let titulo = "Datos de vehiculo";
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewVehiculo({ ...vehiculo, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    switch (modo) {
      case formTypes.CREATE:
        dispatch(addVehiculo(await service.createVehiculo(vehiculo)));
        break;

      case formTypes.EDIT:
        dispatch(updateVehiculo(await service.editVehiculo(vehiculo)));
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

  const [listaContactos, setListaContactos] = useState<Contacto[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const showContactos = (e: any) => {
    const value: string = e.target.value.toString().toLocaleLowerCase();
    if (value.trim() == "") return [];
    let res = nombres.filter(
      (i) =>
        i.apellido.toLocaleLowerCase().startsWith(value) ||
        i.nombre.toLocaleLowerCase().startsWith(value) ||
        i.apellido.concat(` ${i.nombre}`).toLocaleLowerCase().includes(value) ||
        i.nombre.concat(` ${i.apellido}`).toLocaleLowerCase().includes(value)
    );
    setListaContactos(res);
    console.log(listaContactos);
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
            <Dropdown
              show={showSuggestions}
              onFocus={() => {
                if (listaContactos.length > 0) setShowSuggestions(true);
                else setShowSuggestions(false);
              }}
            >
              <InputGroup className="mb-3">
                <FormControl
                  placeholder="Buscar contacto..."
                  aria-label="Buscar contacto..."
                  aria-describedby="basic-addon2"
                  onKeyUp={showContactos}
                />
                <Button variant="outline-warning" id="button-addon2">
                  Aplicar
                </Button>
              </InputGroup>
              <Dropdown.Menu>
                {listaContactos.map((i) => {
                  return (
                    <Dropdown.Item key={i.id} href="#/action-1">
                      {i.apellido} {i.nombre}
                    </Dropdown.Item>
                  );
                })}
              </Dropdown.Menu>
            </Dropdown>
          ) : (
            <></>
          )}

          {vehiculo.contacto ? (
            <>
              <Row>
                <Col>
                  <Form.Group className="mb-3" controlId="nombreContacto">
                    <Form.Label>Nombre</Form.Label>
                    <Form.Control
                      name="modelo"
                      type="text"
                      value={vehiculo.contacto.nombre || ""}
                      disabled
                    />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Label>Apellido</Form.Label>
                  <Form.Control
                    name="modelo"
                    type="text"
                    value={vehiculo.contacto.apellido || ""}
                    disabled
                  />
                </Col>
              </Row>
              <Row>
                <Col>
                  <Form.Label>Telefono</Form.Label>
                  <Form.Control
                    name="modelo"
                    type="text"
                    value={vehiculo.contacto.telefono || ""}
                    disabled
                  />
                </Col>
              </Row>
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
