import { IsNumber, IsString } from "class-validator";

export class AdressDTO{
    @IsString()
    calle: string;
    
    @IsNumber()
    numero: string;
    
    @IsString()
    ciudad: string;
    
    @IsString()
    pais: string;
}