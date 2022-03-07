import Vehiculo from "./Vehiculo";
import ItemIngreso from "./ItemIngreso";

interface Ingreso {
  id: number;
  ingreso: Date;
  egreso?: Date;
  items?: ItemIngreso[];
  vehiculo?: Vehiculo;
}

export const initialStateIngreso: Ingreso = {
  id: -1,
  vehiculo: undefined,
  ingreso: new Date(),
};

export default Ingreso;
