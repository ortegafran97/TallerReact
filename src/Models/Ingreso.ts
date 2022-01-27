import Vehiculo from "./Vehiculo";
import ItemIngreso from "./ItemIngreso";

interface Ingreso {
  id?: Number;
  ingreso: Date;
  egreso?: Date;
  items?: ItemIngreso[];
  vehiculo?: Vehiculo;
}

export const initialStateIngreso: Ingreso = {
  id: undefined,
  vehiculo: undefined,
  ingreso: new Date(),
};

export default Ingreso;
