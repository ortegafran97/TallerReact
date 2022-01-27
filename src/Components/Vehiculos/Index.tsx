import React, { useEffect, useState } from "react";
import { Button, Col, Container, Pagination, Row } from "react-bootstrap";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import {
  addVehiculo as addVehiculoAction,
  deleteVehiculo as deleteVehiculoAction,
  updateVehiculo as updateVehiculoAction,
  getVehiculosAsync,
  selectVehiculos,
  setVehiculos,
} from "../../features/slices/vehiculosSlice";
import Vehiculo, { initialStateVehiculo } from "../../Models/Vehiculo";
import { CREATE, VIEW } from "../../features/constants/FormVisualizationTypes";
import TableVehiculos from "./TableVehiculos";
import ModalVehiculos from "./ModalVehiculos";
import { getVehiculos } from "../../Services/vehiculosService";
import Page from "../../Models/Page";

const Index = () => {
  const dispatch = useAppDispatch();
  const vehiculos = useAppSelector(selectVehiculos);

  /* PAGINATION */
  const [currentPageNumber, setCurrentPageNumber] = useState<number>(0);
  const [page, setPage] = useState<Page<Vehiculo>>(new Page());

  /* Modal */
  const [modalVehiculo, setModalVehiculo] =
    useState<Vehiculo>(initialStateVehiculo);
  const [visibleModal, setVisibleModal] = useState(false);

  /* VISUALIZATION MODE */
  const [modo, setModo] = useState(VIEW);
  const showModalVehiculo = (modo: string, v?: Vehiculo) => {
    setModalVehiculo(v ? v : initialStateVehiculo);
    setModo(modo);
    setVisibleModal(true);
  };
  const closeModal = () => setVisibleModal(false);

  useEffect(() => {
    const promisePage = getVehiculos(currentPageNumber, 10, "");
    Promise.all([promisePage]).then(([pageVehiculos]) => {
      setPage(pageVehiculos);
      dispatch(setVehiculos(pageVehiculos.content));
    });

    /*     dispatch(
      getVehiculosAsync({
        vehiculos,
        pageNumber: currentPage,
        pageSize: 10,
        sortBy: "",
      })
    ); */
    return () => {};
  }, [currentPageNumber, page.numberOfElements]);

  let active = currentPageNumber + 1;
  let items = [];
  for (let number = 1; number <= page.totalPages; number++) {
    items.push(
      <Pagination.Item key={number} active={number === active}>
        {number}
      </Pagination.Item>
    );
  }

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

        <Pagination>
          <Pagination.Prev
            onClick={() => {
              if (currentPageNumber > 0)
                setCurrentPageNumber(currentPageNumber - 1);
            }}
          />
          {items}

          <Pagination.Next
            onClick={() => {
              if (currentPageNumber < page.totalPages - 1)
                setCurrentPageNumber(currentPageNumber + 1);
            }}
          />
        </Pagination>
      </Container>
    </div>
  );
};

export default Index;
