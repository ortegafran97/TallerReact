import React from "react";
import { Button, Table } from "react-bootstrap";
import Contacto from "../../Models/Contacto";
import { Tools, Trash, Pencil } from "react-bootstrap-icons";

import * as FormViewType from "../../features/constants/FormVisualizationTypes";

/* TODO: eliminar columna ID */

interface Props {
  contactos: Contacto[];
  showModal: (modo: string, c?: Contacto) => void;
}

const TableContactos = ({ contactos, showModal }: Props) => {
  if (!contactos) contactos = [];

  return (
    <div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>id</th>
            <th>Apellido</th>
            <th>Nombre</th>
            <th>Telefono</th>
            <th>
              <Tools />
            </th>
          </tr>
        </thead>
        <tbody>
          {contactos.map((c) => {
            return (
              <tr
                key={c.id}
                onDoubleClick={() => {
                  showModal(FormViewType.VIEW, c);
                }}
              >
                <td>{c.id}</td>
                <td>{c.apellido}</td>
                <td>{c.nombre}</td>
                <td>{c.telefono}</td>
                <td>
                  <Pencil
                    onClick={() => {
                      showModal(FormViewType.EDIT, c);
                    }}
                  />
                  <Trash
                    onClick={() => {
                      showModal(FormViewType.DELETE, c);
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

export default TableContactos;
