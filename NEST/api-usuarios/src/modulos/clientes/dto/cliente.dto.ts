import { Type } from "class-transformer";
import { IsDecimal, IsEmail, IsInt, IsNumber, IsOptional, IsString, Matches, ValidateNested } from "class-validator";
import { AddressDto } from "src/common/modelo/dto/address.dto";
import { Usuario } from "src/modulos/usuarios/entities/usuario.entity";
import { JoinColumn, OneToOne } from "typeorm";
import { Cliente } from "../entities/cliente.entity";

//interfaz ICliente (prop:valor) <--> Objeto CreateClienteDTO 
//definir la validacion del objeto que viene desde Internet

export class CreateClienteDto {

    @IsString()
    @Matches(/^\d{8}[A-Z]$/, {message: 'El nif no es correcto, 8 números y una letra mayúscula'})
    nif: string;

    @IsString() /* funcion externa que valida que es un string */
    nombre: string;

    @IsString() /* funcion externa que valida que es un string */
    apellidos: string; 

      //Edad esta comprendidad entre 18 y 58
    @IsInt({message: 'La edad es un entero'}) /* funcion externa que valida que es un número */
    edad: number;

    @IsNumber()
    comision: number;

    @ValidateNested() //valida el objeto direccion: AdressDTO
    @Type(() => AddressDto) //indica el tipo de los elementos del array
    direccion: AddressDto


    // @IsOptional()
    // @IsArray() /* funcion externa que valida que es un array */
    // @ArrayMinSize(2, {message: 'Debe tener al menos 2 teléfonos'})
    // @ArrayMaxSize(3, {message: 'Debe tener  3 teléfonos'})    
    // telefonos: string[];

   


    // @IsOptional()
    // @IsArray()
    // @ArrayMinSize(3, {message: 'Debe tener al menos 3 direcciones'})
    // @ValidateNested({each: true}) //valida cada uno de los elementos del array
    // @Type(() => AdressDTO) //indica el tipo de los elementos del array
    // direcciones: AdressDTO[]; //array de direcciones
   
    
}

