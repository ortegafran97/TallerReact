import React from "react";
import { Button, Table } from "react-bootstrap";
import Contacto from "../../Models/Contacto";
import { Tools, Trash, Pencil } from "react-bootstrap-icons";

interface Props {
  contactos: Contacto[];
  showModal: (c: Contacto, modo: string) => void;
}

const TableContactos = (props: Props) => {
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
          {props.contactos.map((c) => {
            return (
              <tr
                key={c.id}
                onDoubleClick={() => {
                  props.showModal(c, "view");
                }}
              >
                <td>{c.id}</td>
                <td>{c.nombre}</td>
                <td>{c.apellido}</td>
                <td>{c.telefono}</td>
                <td onClick={undefined}>
                  <Pencil
                    onClick={() => {
                      props.showModal(c, "edit");
                    }}
                  />
                  <Trash
                    onClick={() => {
                      props.showModal(c, "delete");
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
