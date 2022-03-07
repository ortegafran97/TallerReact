import React from "react";
import Ingreso from "../../Models/Ingreso";
import {
  addIngreso,
  updateIngreso,
  deleteIngreso,
  getIngresoAsync,
  selectIngresos,
  setIngresos,
} from "../../features/slices/ingresosSlice";
import { CREATE, VIEW } from "../../features/constants/FormVisualizationTypes";
import TableEnProceso from "./TableEnProceso";
import { useAppSelector } from "../../app/hooks";

const Index = () => {
  const ingresos = useAppSelector(selectIngresos);
  return (
    <div>
      <TableEnProceso lista={ingresos.filter((i) => !i.egreso)} />
    </div>
  );
};

export default Index;
