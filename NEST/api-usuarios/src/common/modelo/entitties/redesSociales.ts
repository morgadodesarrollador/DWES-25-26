import { Column } from "typeorm";

export class RedesSociales {
    @Column({nullable: true, length: 50}) 
    pais: string;
}
