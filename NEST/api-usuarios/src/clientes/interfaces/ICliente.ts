import { IAdress } from "src/common/interfaces/IAddres";

//definir la estructura del objeto que viene desde Internet
export interface ICliente {
    nif: string;
    name: string;
    email: string;
    edad: number;
    comision: number;
    direccion: IAdress;
} 