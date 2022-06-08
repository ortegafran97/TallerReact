interface Contacto {
  id?: number | undefined;
  nombre: string;
  apellido: string;
  telefono: string;
}

export let initialState: Contacto = {
  id: undefined,
  nombre: "",
  apellido: "",
  telefono: "",
};

export default Contacto;
