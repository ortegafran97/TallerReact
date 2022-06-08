import React, { useState } from "react";
import { Col, Form, Row } from "react-bootstrap";
import { useAppSelector } from "../../../app/hooks";
import { selectVehiculos } from "../../../features/slices/vehiculosSlice";
import Vehiculo, { initialStateVehiculo } from "../../../Models/Vehiculo";

interface Props {
  vehiculo: Vehiculo;
  setVehiculo: (v:Vehiculo) => void;
}

const SectionVehiculo = ({vehiculo,setVehiculo}:Props) => {
  const list = useAppSelector(selectVehiculos);

  // const [vehiculo, setVehiculo] = useState<Vehiculo>(initialStateVehiculo);

  const [filteredList, setFilteredList] = useState<Vehiculo[]>(list);

  /* Datalists load */
  const marcasDL = () => {
    let items: string[] = Array.from(
      new Set(
        filteredList.map((m) => {
          return m.marca;
        })
      )
    );
    items = items.filter((i) => i !== undefined && i !== null);
    return items.map((m) => {
      return <option key={m}>{m}</option>;
    });
  };
  function modelosDL() {
    let items: string[] = Array.from(
      new Set(
        filteredList.map((m) => {
          return m.modelo;
        })
      )
    );
    items = items.filter((i) => i !== undefined && i !== null);
    return items.map((m) => {
      return <option key={m}>{m}</option>;
    });
  }
  function patentesDL() {
    let items = Array.from(
      new Set(
        filteredList.map((m) => {
          return m.patente;
        })
      )
    );
    items = items.filter((i) => i !== undefined && i !== null);
    return items.map((m) => {
      return <option key={m}>{m}</option>;
    });
  }

  /* HANDLERS */
  const handleChange = (e: any) => {
    const newV = {
      ...vehiculo,
      [e.target.name]: e.target.value,
    };
    setVehiculo(newV);

    switch (e.target.name) {
      case "anio":
        break;
      case "marca":
        const newList1 = filteredList.filter((i) => i.marca === e.target.value);
        setFilteredList(newList1 ?? []);
        break;
      case "modelo":
        const newList2 = filteredList.filter(
          (i) => i.modelo === e.target.value
        );
        setFilteredList(newList2 ?? []);
        break;
      case "patente":
        const newList3 = filteredList.filter(
          (i) => i.patente === e.target.value
        );
        setFilteredList(newList3 ?? []);

        /* Si la patente ya esta guardada asignar vehiculo como ingreso */
        /* 
        const x = filteredList.find((i) => i.patente === e.target.value);
        if (x) setVehiculoIngresado(x); 
        */

        break;
      default:
        console.log("DEFAULT CASE");
        break;
    }
    if (filteredList.length === 0) setFilteredList(list);
  };

  return (
    <>
      {/* DATALISTS */}
      <datalist id="marcas">{marcasDL()}</datalist>
      <datalist id="modelos">{modelosDL()}</datalist>
      <datalist id="patentes">{patentesDL()}</datalist>

      {/* BODY */}
      <Row>
        <Col>Datos de vehiculo</Col>
      </Row>
      <Row>
        <Col>
          <span>Vehiculo</span>
          <Form.Group>
            <Form.Label>Id</Form.Label>
            <Form.Control
              name="id"
              type="text"
              placeholder=""
              value={vehiculo.id ?? ""}
              disabled
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Patente</Form.Label>
            <Form.Control
              name="patente"
              type="text"
              placeholder="Ingrese patente"
              value={vehiculo.patente ?? ""}
              list="patentes"
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Marca</Form.Label>
            <Form.Control
              name="marca"
              type="text"
              placeholder="Ingrese marca"
              list="marcas"
              onChange={handleChange}
              value={vehiculo.marca}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Modelo</Form.Label>
            <Form.Control
              name="modelo"
              type="text"
              placeholder="Ingrese modelo"
              list="modelos"
              onChange={handleChange}
              value={vehiculo.modelo}
            />
          </Form.Group>

          {/* Campo anio larga problemas */}
          <Form.Group>
            <Form.Label>Año</Form.Label>
            <Form.Control
              name="anio"
              type="number"
              placeholder="Ingrese año"
              onChange={handleChange}
              value={vehiculo.anio}
            />
          </Form.Group>
        </Col>
      </Row>
    </>
  );
};

export default SectionVehiculo;
