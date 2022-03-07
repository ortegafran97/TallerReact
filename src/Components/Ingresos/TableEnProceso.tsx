import React from "react";
import { Table } from "react-bootstrap";
import { Pencil, Tools, Trash } from "react-bootstrap-icons";
import Ingreso from "../../Models/Ingreso";

interface Props {
  lista: Ingreso[];
}

const TableEnProceso = ({ lista }: Props) => {
  //   console.log(lista);

  return (
    <div>
      <Table>
        <thead>
          <tr>
            <th>id</th>
            <th>Ingreso</th>
            <th>Vehiculo</th>
            <th>Subtotal</th>
            <th>
              <Tools />
            </th>
          </tr>
        </thead>
        <tbody>
          {lista.map((i) => {
            let subtotal = 0;
            if (i.items)
              for (let index = 0; index < i.items.length; index++) {
                const item = i.items[index];
                const suma = item.costo * item.cantidad;
                subtotal += suma;
              }

            return (
              <tr key={i.id}>
                <td>{i.id}</td>
                <td>{i.ingreso}</td>
                <td>
                  {i.vehiculo?.marca} - {i.vehiculo?.modelo}
                </td>
                <td>${subtotal}</td>
                <td>
                  <Pencil />
                  <Trash />
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </div>
  );
};

export default TableEnProceso;
