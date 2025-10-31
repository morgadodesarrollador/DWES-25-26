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

    async new (cliente: ICliente){ //cliente: DTO/Ifaz
        // transformar el objeto cliente DTO/Ifaz en una entidad cliente (Entity<Cliente)
        const cliente_data = this.clientesRepository.create(cliente);
        await this.clientesRepository.save(cliente_data);
        return {
            status: true,
            code: 200,
            msg: 'Cliente creado',
            data: cliente
        }
    }
}
