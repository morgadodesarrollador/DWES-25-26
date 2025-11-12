import { IsArray, IsNumber, IsInt, IsString, Min, Max, IsEmail, IsEmpty, IsNotEmpty, 
    IsOptional, MinLength, MaxLength, IsAlpha, 
    ArrayMinSize, ArrayMaxSize, Matches, 
    IsIn,
    IsBoolean,
    IsUUID,
    ValidateNested} from "class-validator";


import { Type } from "class-transformer";
import { CreateClienteDto } from "src/modulos/clientes/dto/cliente.dto";
//peticion a los roles que hay en la tabla de roles de la api
const roles: string[] = ['administrador', 'usuario', 'invitado'];

export class CreateUserDto {

    @IsString() /* funcion externa que valida que es un string */
    username: string;

    @IsEmail() /* funcion externa que valida que es un string */
    email: string;

    @IsString() /* funcion externa que valida que es un string */
    password: string;

    @IsIn(roles, {message: `El rol debe ser uno de los siguientes: ${roles}`})
    rol: string;
   
    @IsOptional()
    @IsString() /* funcion externa que valida que es un string */
    foto: string;

    // caso1 --> un objeto cliente
    //@IsOptional()
    @ValidateNested() //valida cada uno de los elementos del array
    @Type(() => CreateClienteDto) //indica el tipo de los elementos del array
    cliente: CreateClienteDto

    // caso2 --> el nif del cliente
    @IsOptional()
    @IsString()
    nif: string;
}


