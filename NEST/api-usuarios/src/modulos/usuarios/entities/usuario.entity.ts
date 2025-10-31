
//**** ORM --> Mapeo Objeto - Relacional ***** */

import { Address } from "src/common/modelo/entitties/address";
import { BeforeInsert, Column, CreateDateColumn, Entity, PrimaryColumn, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

//create table usuario (id ....)
//LOGICA DE NEGOCIO DE LA ENTIDAD USUARIO. Hola


@Entity('usuario')
export class Usuario {
    
    @PrimaryColumn()
    nif: string;

    @Column('uuid')
    id: string;

    @Column({ nullable:true,  length: 30})
    username: string;

    @Column({ nullable:true,  length: 30})
    password: string;

    @Column({nullable: false, unique: true})
    email: string;
    
    @Column()
    rol: string;

    @Column(() => Address, { prefix: 'direccion' }) direccion: Address;
  
    //**** MECENISMOS DE SEGURIDAD  *****/
    //monitorizar y auditarlos registros de usuarios y 
    //tabla de accesos --> login/logout/change Profile ...  
    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
    
    //deletedAt: Date;
    //@Before/After-Insert/Update/Remove 


    @BeforeInsert() //evento disparador
    CheckNif(){ // método manejador del evento
        console.log('Antes nif de insertar el usuario en la BD');
        if (!this.nif.includes('-')){
            const letra = this.nif.slice(-1).toUpperCase();
            const numeros = this.nif.slice(0, -1);
            this.nif = `${numeros}-${letra}`;   
        }

    }
    // @BeforeInsert()
    // checkName() {
    //     console.log('Antes de insertar el usuario en la BD');
    //     if (!this.name){
    //         this.name = 'invitado';
    //     }

    //     this.name = this.name
    //                 .replaceAll(' ', '_')
    //                 .toUpperCase();  
    // }
}