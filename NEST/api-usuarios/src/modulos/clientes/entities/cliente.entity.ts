
//**** ORM --> Mapeo Objeto - Relacional ***** */

import { Usuario } from "src/modulos/usuarios/entities/usuario.entity";
import { Address } from "../../../common/modelo/entitties/address";
import { BeforeInsert, Column, Entity, OneToOne, PrimaryColumn } from "typeorm";


@Entity('cliente')
export class Cliente {
    
    @PrimaryColumn()
    nif: string

    @Column({ nullable:true,  length: 30})
    nombre: string;

    @Column({ nullable:true,  length: 30})
    apellidos: string;

    @Column('int', {default: 18})
    edad: number;
    
    @Column('float', {default: 0.3})
    comision: number;

    @Column(() => Address, { prefix: '' }) direccion: Address;
   
    //1 cliente --> 1 usuario
    //Relacion inversa (sin JoinColumn)
    @OneToOne (
        () => Usuario,
        (usuario) => usuario.cliente, { eager: false }
    )
    usuario: Usuario



    


    //**** MECENISMOS DE SEGURIDAD  *****/
    //monitorizar y auditarlos registros de usuarios y 
    //tabla de accesos --> login/logout/change Profile ...  
   

    // @BeforeInsert() //evento disparador
    // CheckNif(){ // método manejador del evento
    //     console.log('Antes nif de insertar el usuario en la BD');
    //     if (!this.nif.includes('-')){
    //         const letra = this.nif.slice(-1).toUpperCase();
    //         const numeros = this.nif.slice(0, -1);
    //         this.nif = `${numeros}-${letra}`;   
    //     }
    // }
    
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