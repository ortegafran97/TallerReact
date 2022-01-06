import Contacto from "../../Models/Contacto";
import { getContactos } from "../../Services/contactosService";

// A mock function to mimic making an async request for data
/* export function fetchContactos(contactos = []) {
  return new Promise<{ data: any[] }>((resolve) =>
    setTimeout(
      () =>
        resolve({
          data: [
            { id: 1, nombre: "franco", apellido: "ortega" },
            { id: 2, nombre: "brian", apellido: "orona" },
          ],
        }),
      500
    )
  );
} */

export async function fetchContactos(contactos: Contacto[] = []) {
  const res = await getContactos();
  return { data: res };
}

//TODO
export function createContacto(contacto: Contacto) {
  return {
    id: -1,
    nombre: undefined,
    apellido: undefined,
    telefono: undefined,
  };
}
