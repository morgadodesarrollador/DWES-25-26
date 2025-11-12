
//**** ORM --> Mapeo Objeto - Relacional ***** */

import { Type } from "class-transformer";
import { ValidateNested } from "class-validator";
import { AddressDto } from "src/common/modelo/dto/address.dto";
import { Address } from "src/common/modelo/entitties/address";
import { Cliente } from "src/modulos/clientes/entities/cliente.entity";
import { BeforeInsert, Column, CreateDateColumn, Entity, JoinColumn, OneToOne, PrimaryColumn, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

//create table usuario (id ....)
//LOGICA DE NEGOCIO DE LA ENTIDAD USUARIO. Hola


@Entity('usuario')
export class Usuario {
    

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ nullable:true,  length: 30})
    username: string;

    @Column({ nullable:true,  length: 30})
    password: string;

    @Column({nullable: false, unique: true})
    email: string;
    
    @Column()
    foto: string; 

    @Column()
    rol: string;


    //1 usuario --> 1 cliente
    //Relación Directa (con JoinColumn)
    @OneToOne (
        () => Cliente, 
        (cliente) => cliente.usuario, { cascade: false }
    )
    @JoinColumn({
        name: 'cliente',
        foreignKeyConstraintName: 'fk_cliente_en_usuario'
    }) //genera la FKey
    cliente: Cliente


  
    /* crear un objeto embebido con las redes sociales */

  
    //**** MECENISMOS DE SEGURIDAD  *****/
    //monitorizar y auditarlos registros de usuarios y 
    //tabla de accesos --> login/logout/change Profile ...  
    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
    
    @BeforeInsert()
    checkusername(){
        //jsanmar345
        this.username = 
            this.cliente.nombre + '.' + 
            this.cliente.apellidos + '.' +
            this.cliente.edad
    }
}