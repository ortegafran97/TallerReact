import axios from "axios";
import { useDispatch } from "react-redux";
import Contacto from "../Models/Contacto";

// import config from "../../config";
// import Contacto from "../Models/Contacto";

const API = "http://localhost:5000" + "/contactos";

export const getContactos = async (
  pageNumber?: number,
  pageSize?: number,
  sortBy?: string
): Promise<Contacto[]> => {
  try {
    let endpoint = `${API}?`;

    if (pageSize !== undefined)
      endpoint = endpoint.concat(`&pageSize=${pageSize}`);

    if (pageNumber !== undefined)
      endpoint = endpoint.concat(`&pageNumber=${pageNumber}`);

    if (sortBy !== undefined) endpoint = endpoint.concat(`&sortBy=${sortBy}`);

    const res = (await axios.get(endpoint)).data.content;
    return res;
  } catch (e) {
    console.log(e);
    return [];
  }
};

export const getContactoById = async (id: Number): Promise<Contacto> => {
  const res = await axios.get(`${API}/${id}`);
  return res.data.content[0];
};

export const createContacto = async (contacto: Contacto): Promise<Contacto> => {
  console.log(`CREATE CONTACTO: ${contacto}`);

  const res = await axios.post(API, contacto, {
    headers: {  },
  });
  return res.data;
};

export const editContacto = async (contacto: Contacto): Promise<Contacto> => {
  const res = await axios.put(API, contacto);
  return res.data;
};

export const deleteContacto = async (id: Number): Promise<Contacto> => {
  const res = await axios.delete(`${API}/${id}`);
  return res.data;
};