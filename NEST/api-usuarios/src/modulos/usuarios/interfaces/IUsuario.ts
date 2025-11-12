
//definir la estructura de datos de un objeeto usuario
//Interfaces --> a las estructuras de datos que se transmiten por la red
//types -->. para definir estructuras de datos internas o esquemas de datos
//dtos --> para validar estructuraas de datos que se reciben desde la red

import { IAdress } from "src/common/modelo/interfaces/IAddres";
import { ICliente } from "src/modulos/clientes/interfaces/ICliente";


export interface IUser {
    
    username: string;
    email: string;
    password: string;
    rol: string;
    foto?: string;
    cliente?: ICliente;
    nif?: string;
} 

export interface IRespUser {
    status: boolean;
    code: number;
    msg: string;
    data?: any;
}


type TUsers = {
    id: number;
    name: string;
    email: string;
}
