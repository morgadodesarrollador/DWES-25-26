
//**** ORM --> Mapeo Objeto - Relacional ***** */

import { Address } from "src/common/entitties/address";
import { BeforeInsert, Column, CreateDateColumn, Entity, PrimaryColumn, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";


@Entity('cliente')
export class Cliente {
    
    @PrimaryColumn()
    nif: string

    @Column({ nullable:true,  length: 30})
    name: string;

    @Column('int', {default: 18})
    edad: number;
    
    @Column({nullable: false, unique: true})
    email: string;
    
    @Column('float', {default: 0.3})
    comision: number;

    @Column(() => Address, { prefix: '' }) address: Address;
    
  
    //**** MECENISMOS DE SEGURIDAD  *****/
    //monitorizar y auditarlos registros de usuarios y 
    //tabla de accesos --> login/logout/change Profile ...  
   

    @BeforeInsert() //evento disparador
    CheckNif(){ // método manejador del evento
        console.log('Antes nif de insertar el usuario en la BD');
        if (!this.nif.includes('-')){
            const letra = this.nif.slice(-1).toUpperCase();
            const numeros = this.nif.slice(0, -1);
            this.nif = `${numeros}-${letra}`;   
        }

    }
    @BeforeInsert()
    checkName() {
        console.log('Antes de insertar el usuario en la BD');
        if (!this.name){
            this.name = 'invitado';
        }

        this.name = this.name
                    .replaceAll(' ', '_')
                    .toUpperCase();  
    }
}