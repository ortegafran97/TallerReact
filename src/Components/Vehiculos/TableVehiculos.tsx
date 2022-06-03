import React, { useState, VoidFunctionComponent } from "react";
import { Table } from "react-bootstrap";
import { Pencil, Tools, Trash, Person } from "react-bootstrap-icons";
import Vehiculo, { initialStateVehiculo } from "../../Models/Vehiculo";
import * as FormViewType from "../../features/constants/FormVisualizationTypes";
import DatosContacto from "../Contactos/DatosContacto";
import ModalCambioPropietario from "./ModalCambioPropietario";

interface Props {
  vehiculos: Vehiculo[];
  showCambioProp: (vehiculo?: Vehiculo) => void;
  showModal: (modo: string, c?: Vehiculo) => void;
}

const TableVehiculos = ({ vehiculos, showModal, showCambioProp }: Props) => {
  if (!vehiculos) vehiculos = [];

  return (
    <div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>id</th>
            <th>Patente</th>
            <th>Marca</th>
            <th>Modelo</th>
            <th>Propietario</th>
            <th>
              <Tools />
            </th>
          </tr>
        </thead>
        <tbody>
          {vehiculos.map((v) => {
            return (
              <tr
                key={v.id}
                onDoubleClick={() => {
                  showModal(FormViewType.VIEW, v);
                }}
              >
                <td>{v.id}</td>
                <td>{v.patente}</td>
                <td>{v.marca}</td>
                <td>{v.modelo}</td>
                <td>
                  {v.contacto
                    ? v.contacto?.nombre + " " + v.contacto?.apellido
                    : ""}
                </td>
                <td>
                  <Pencil
                    onClick={() => {
                      showModal(FormViewType.EDIT, v);
                    }}
                  />
                  <Trash
                    onClick={() => {
                      showModal(FormViewType.DELETE, v);
                    }}
                  />
                  <Person
                    onClick={() => {
                      showCambioProp(v);
                    }}
                  />
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </div>
  );
};

export default TableVehiculos;
