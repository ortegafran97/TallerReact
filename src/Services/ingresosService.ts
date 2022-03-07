import axios from "axios";
import Ingreso, { initialStateIngreso } from "../Models/Ingreso";
import ItemIngreso from "../Models/ItemIngreso";
import Contacto from "../Models/Contacto";
import Page from "../Models/Page";
import Vehiculo from "../Models/Vehiculo";

const API = "http://localhost:5000" + "/ingresos";

export const getIngresos = async (
  pageNumber?: number,
  pageSize?: number,
  sortBy?: string
): Promise<Page<Ingreso>> => {
  try {
    let endpoint = `${API}?`;

    if (pageSize !== undefined)
      endpoint = endpoint.concat(`&pageSize=${pageSize}`);

    if (pageNumber !== undefined)
      endpoint = endpoint.concat(`&pageNumber=${pageNumber}`);

    if (sortBy !== undefined) endpoint = endpoint.concat(`&sortBy=${sortBy}`);
    else endpoint = endpoint.concat(`&sortBy=-fechaIngreso`);

    const res: Page<Ingreso> = (await axios.get(endpoint)).data;

    return res;
  } catch (e) {
    return new Page();
  }
};

export const getIngresoById = async (id: number): Promise<Ingreso> => {
  try {
    return (await axios.get(`${API}/${id}`)).data.content;
  } catch (e) {
    return initialStateIngreso;
  }
};

export const createIngreso = async (vehiculo: Vehiculo): Promise<Ingreso> => {
  try {
    return (await axios.post(API, vehiculo)).data;
  } catch (e) {
    return initialStateIngreso;
  }
};

export const editIngreso = async (ingreso: Ingreso): Promise<Ingreso> => {
  try {
    return (await axios.put(`${API}/${ingreso.id}`, ingreso)).data;
  } catch (e) {
    return initialStateIngreso;
  }
};

export const deleteIngreso = async (id: number): Promise<Ingreso> => {
  try {
    return (await axios.delete(`${API}/${id}`)).data;
  } catch (e) {
    return initialStateIngreso;
  }
};
