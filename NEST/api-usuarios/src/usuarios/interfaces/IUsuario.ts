
//definir la estructura de datos de un objeeto usuario
//Interfaces --> a las estructuras de datos que se transmiten por la red
//types -->. para definir estructuras de datos internas o esquemas de datos
//dtos --> para validar estructuraas de datos que se reciben desde la red
export interface IUser {
    id: number;
    name: string;
    email: string;
    edad: number;
} 



type TUsers = {
    id: number;
    name: string;
    email: string;
}
