import React from "react";
import { Table } from "react-bootstrap";
import { Pencil, Tools, Trash } from "react-bootstrap-icons";
import Vehiculo from "../../Models/Vehiculo";
import * as FormViewType from "../../features/constants/FormVisualizationTypes";

interface Props {
  vehiculos: Vehiculo[];
  showModal: (modo: string, c?: Vehiculo) => void;
}

const TableVehiculos = ({ vehiculos, showModal }: Props) => {
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
            <th>Dueño</th>
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
