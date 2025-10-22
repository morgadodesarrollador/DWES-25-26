
//**** ORM --> Mapeo Objeto - Relacional ***** */

import { Column, Entity, PrimaryColumn } from "typeorm";

//create table usuario (id ....)
//LOGICA DE NEGOCIO DE LA ENTIDAD USUARIO. Hola
@Entity('usuario')
export class Usuario {
    @PrimaryColumn()
    id: number;

    @Column()
    name: string    ;
    @Column()
    edad: number;
    @Column()
    email: string;
    
    @Column()
    nif: string;
    
    @Column()
    rol: string;
  
}