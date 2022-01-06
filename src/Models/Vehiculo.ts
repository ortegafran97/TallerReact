import Contacto from './Contacto'

interface Vehiculo{
    id: Number,
    marca: String,
    modelo: String,
    anio: Number,
    patente: String
    contacto: Contacto,
}

export default Vehiculo;