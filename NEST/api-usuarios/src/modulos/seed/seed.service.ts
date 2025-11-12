import { Injectable } from '@nestjs/common';

import * as seedClientes from './data/clientes.json';
import * as seedUsusarios from './data/usuarios.json';

import { Cliente } from '../clientes/entities/cliente.entity';
import { ClientesService } from '../clientes/clientes.service';
import { UsuariosService } from '../usuarios/usuarios.service';
import { IUser } from '../usuarios/interfaces/IUsuario';

@Injectable()
export class SeedService {
    
    constructor(
        //en seedService inyectar el servicio de clientes
        private readonly clientesService: ClientesService,
        private readonly usuariosService: UsuariosService
    ){}
    
    async loadData() {
        console.log('Cargando datos de prueba...');
        //borrado masivo de tablas en funcion de las Pk
        await this.usuariosService.deleteAllUsarios()
        await this.clientesService.deleteAllclientes();

        //inserccion masiva de datos en tablas en funcion de las Pk
        await this.insertNewClientes();
        await this.insertNewUsuarios();
        return { 
            message: 'Data loaded successfully',
            data: seedClientes
        };
    }

    private async insertNewClientes() {
        //array para guardar las promesas de inserccion
        const insertPromisesClientes = [];                
        //recorrer el array seedClientes para su inserccion uno a uno en la BD
        seedClientes.forEach( (cliente: any) => {
            //se manda de forma ipsoFacta(1s) las 20 insercciones a la BD
            insertPromisesClientes.push(this.clientesService.new(cliente))
            console.log(cliente.apellidos);
        })
        const results = await Promise.all(insertPromisesClientes);
        return true
    }

     private async insertNewUsuarios() {
        //array para guardar las promesas de inserccion
        const insertPromisesUsuarios = [];                
        //recorrer el array seedClientes para su inserccion uno a uno en la BD
        seedUsusarios.forEach( (usuario: IUser) => {
            //se manda de forma ipsoFacta(1s) las 20 insercciones a la BD
            insertPromisesUsuarios.push(this.usuariosService.new(usuario))
            console.log(usuario.username);
        })
        const results = await Promise.all(insertPromisesUsuarios);
        return true
    }

    
}
