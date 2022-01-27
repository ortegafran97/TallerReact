import axios from "axios";
import Contacto from "../Models/Contacto";
import Vehiculo, { initialStateVehiculo } from "../Models/Vehiculo";
import Page from "../Models/Page";

const API = "http://localhost:5000" + "/vehiculos";

export const getVehiculos = async (
  pageNumber?: number,
  pageSize?: number,
  sortBy?: string
): Promise<Page<Vehiculo>> => {
  try {
    let endpoint = `${API}?`;

    if (pageSize !== undefined)
      endpoint = endpoint.concat(`&pageSize=${pageSize}`);

    endpoint =
      pageSize !== undefined
        ? endpoint.concat(`&pageSize=${pageSize}`)
        : endpoint.concat(`&pageSize=10`);

    if (pageNumber !== undefined)
      endpoint = endpoint.concat(`&pageNumber=${pageNumber}`);

    if (sortBy !== undefined) endpoint = endpoint.concat(`&sortBy=${sortBy}`);
    else endpoint = endpoint.concat(`&sortBy=modelo`);

    const res: Page<Vehiculo> = (await axios.get(endpoint)).data;

    return res;
  } catch (e) {
    return new Page();
  }
};

export const getVehiculoById = async (id: number): Promise<Vehiculo> => {
  try {
    return (await axios.get(`${API}/${id}`)).data.content[0];
  } catch (e) {
    return initialStateVehiculo;
  }
};

export const createVehiculo = async (vehiculo: Vehiculo): Promise<Vehiculo> => {
  try {
    delete vehiculo.id;
    return (await axios.post(API, vehiculo)).data;
  } catch (e) {
    return initialStateVehiculo;
  }
};

export const editVehiculo = async (vehiculo: Vehiculo): Promise<Vehiculo> => {
  try {
    return (await axios.put(`${API}/${vehiculo.id}`, vehiculo)).data;
  } catch (e) {
    return initialStateVehiculo;
  }
};

export const deleteVehiculo = async (id: number): Promise<Vehiculo> => {
  try {
    return (await axios.delete(`${API}/${id}`)).data;
  } catch (e) {
    return initialStateVehiculo;
  }
};
