import React from "react";
import { Button, Table } from "react-bootstrap";
import Contacto from "../../Models/Contacto";
import { Tools, Trash, Pencil } from "react-bootstrap-icons";

import * as FormViewType from "../../features/constants/FormVisualizationTypes";

interface Props {
  contactos: Contacto[];
  showModal: (c: Contacto, modo: string) => void;
}

const TableContactos = ({ contactos, showModal }: Props) => {
  if (!contactos) contactos = [];

  return (
    <div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>id</th>
            <th>Nombre</th>
            <th>Apellido</th>
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
                  showModal(c, FormViewType.VIEW);
                }}
              >
                <td>{c.id}</td>
                <td>{c.nombre}</td>
                <td>{c.apellido}</td>
                <td>{c.telefono}</td>
                <td onClick={undefined}>
                  <Pencil
                    onClick={() => {
                      showModal(c, FormViewType.EDIT);
                    }}
                  />
                  <Trash
                    onClick={() => {
                      showModal(c, FormViewType.DELETE);
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
