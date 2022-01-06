interface Contacto {
  id?: number;
  nombre: string;
  apellido: string;
  telefono: string;
}

export let initialState: Contacto = {
  id: 0,
  nombre: "",
  apellido: "",
  telefono: "",
};

export default Contacto;
