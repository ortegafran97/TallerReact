import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.css";
import { Counter } from "./features/counter/Counter";
import { Contactos } from "./Components/Contactos/Index";
import "./App.css";
import Header from "./Components/Util/Header";
import { Outlet } from "react-router-dom";
import {
  getVehiculosAsync,
  selectVehiculos,
} from "./features/slices/vehiculosSlice";
import { useAppDispatch, useAppSelector } from "./app/hooks";
import {
  getContactosAsync,
  selectContactos,
} from "./features/contactos/contactosSlice";
import {
  getIngresoAsync,
  selectIngresos,
} from "./features/slices/ingresosSlice";
// import { Modal } from "react-bootstrap";

function App() {
  const dispatch = useAppDispatch();
  const vehiculos = useAppSelector(selectVehiculos);
  const contactos = useAppSelector(selectContactos);
  const ingresos = useAppSelector(selectIngresos);

  useEffect(() => {
    dispatch(getVehiculosAsync({ vehiculos }));
    // dispatch(getContactosAsync(contactos));
    dispatch(getContactosAsync([]));
    dispatch(getIngresoAsync([]));
  }, []);

  return (
    <div className="App">
      <Header />
      <Outlet />
    </div>
  );
}

export default App;
