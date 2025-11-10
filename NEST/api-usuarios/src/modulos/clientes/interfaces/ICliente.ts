import { IAdress } from "src/common/modelo/interfaces/IAddres";

//definir la estructura del objeto que viene desde Internet
export interface ICliente {
    nif: string;
    nombre: string;
    apellidos: string;
    edad: number;
    comision: number;
    direccion: IAdress;
} 