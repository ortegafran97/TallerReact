import Contacto from "./Contacto";

interface Vehiculo {
  id?: number;
  patente: string;
  marca: string;
  modelo: string;
  anio?: number;
  contacto?: Contacto;
}

export const initialStateVehiculo: Vehiculo = {
  id: undefined,
  marca: "",
  modelo: "",
  anio: undefined,
  patente: "",
  contacto: undefined,
};

export default Vehiculo;
