import React, { useEffect, useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import {
  addVehiculo as addVehiculoAction,
  deleteVehiculo as deleteVehiculoAction,
  updateVehiculo as updateVehiculoAction,
  getVehiculosAsync,
  selectVehiculos,
} from "../../features/slices/vehiculosSlice";
import Vehiculo, { initialStateVehiculo } from "../../Models/Vehiculo";
import { CREATE, VIEW } from "../../features/constants/FormVisualizationTypes";
import TableVehiculos from "./TableVehiculos";
import ModalVehiculos from "./ModalVehiculos";

const Index = () => {
  const vehiculos = useAppSelector(selectVehiculos);
  const dispatch = useAppDispatch();

  /* Modal */
  const [modalVehiculo, setModalVehiculo] =
    useState<Vehiculo>(initialStateVehiculo);
  const [visibleModal, setVisibleModal] = useState(false);
  const [modo, setModo] = useState(VIEW);
  const showModalVehiculo = (modo: string, v?: Vehiculo) => {
    setModalVehiculo(v ? v : initialStateVehiculo);
    setModo(modo);
    setVisibleModal(true);
  };
  const closeModal = () => setVisibleModal(false);

  /* Table */
  useEffect(() => {
    //Carga de vehiculos
    const page = dispatch(getVehiculosAsync(vehiculos));
  }, []);

  return (
    <div>
      <ModalVehiculos
        vehiculo={modalVehiculo}
        modo={modo}
        show={visibleModal}
        closeModal={closeModal}
        setNewVehiculo={setModalVehiculo}
      />
      <Container>
        <Row>
          <Col>
            <h2>Lista vehiculos</h2>
          </Col>
          <Col>
            <Button
              onClick={() => {
                showModalVehiculo(CREATE);
              }}
            >
              Agregar vehiculo
            </Button>
          </Col>
        </Row>
        <Row>
          <Col md={12}>
            <TableVehiculos
              vehiculos={vehiculos}
              showModal={showModalVehiculo}
            />
          </Col>
        </Row>

        <Button
          onClick={() => {
            showModalVehiculo(CREATE);
          }}
        >
          Abrir modal
        </Button>
      </Container>
    </div>
  );
};

export default Index;
