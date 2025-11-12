import { Injectable } from '@nestjs/common';
import { Cliente } from './entities/cliente.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ICliente } from './interfaces/ICliente';

@Injectable()
export class ClientesService {
    //servicio --> Repositorio (inyectar repositorio)
    //repositorio --> SGBD (base de datos)
    constructor(
        @InjectRepository(Cliente) 
        private readonly clientesRepository: Repository<Cliente>
    ){
        // codigo contructor servicio
    }

    create (cliente: ICliente){
       return this.clientesRepository.create(cliente);
    }

    async new (cliente: ICliente){ //cliente: DTO/Ifaz
        // transformar el objeto cliente DTO/Ifaz en una entidad cliente (Entity<Cliente)
        const clienteEntity = this.clientesRepository.create(cliente);
        await this.clientesRepository.save(clienteEntity);
        return {
            status: true,
            code: 200,
            msg: 'Cliente creado',
            data: cliente
        }
    }

    //obtener 1 objeto (detalle)
    async findOne(nif: string) {
        //select * from Cliente C where C.nif = ${nif}
        const cliente = await this.clientesRepository.findOne({
            where: { nif }
        })
        console.log(cliente)
        return cliente;
    }

    async deleteAllclientes(){
        console.log('borrar clientes')
        const query = this.clientesRepository.createQueryBuilder('cliente');
        try {
            return await query
                .delete()
                .where({})
                .execute()
        }catch(error){
            
        }
    }
}
