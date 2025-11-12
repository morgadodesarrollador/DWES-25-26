import { Injectable } from '@nestjs/common';
import { Low } from 'lowdb';
import { JSONFile } from 'lowdb/node';
import { IRespUser, IUser } from './interfaces/IUsuario';
import { DataSource, Repository } from 'typeorm';
import { Usuario } from './entities/usuario.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Cliente } from '../clientes/entities/cliente.entity';
import { ClientesService } from '../clientes/clientes.service';

type Data = { users: IUser[] }
@Injectable()
export class UsuariosService {
  //private db: Low<Data>;

  //inyectar ORM en SERVICIO
  //inyectar el repositorio de usuarios en el servicio UsuarioService

  constructor(
    @InjectRepository(Usuario)
    private readonly usuarioRepository: Repository<Usuario>,
    private readonly clientesService: ClientesService,
    private dataSource: DataSource //obj q contiene todo el esquema de la BD
  ) {
    // const adaptador = new JSONFile<Data>('common/db/db.json');
    // this.db = new Low<Data>(adaptador, { users: [] } );
  }

  async findOne(id: number): Promise<IUser>{
    console.log(id)
    // const data = await this.db.read();//se bloquea
 //   const usuario = this.db.data.users.find(usuario => usuario.id === parseInt(id));
   // console.log(usuario)
    return null;
  }
  async findAll(){
    // await this.db.read();//se bloquea
    // return this.db.data.users;
  }

  async new(usuarioDTO: IUser):Promise<IRespUser | any>{

    if (usuarioDTO.nif){ //caso 2
      console.log("Buscar cliente existe");
      const cliente = await this.clientesService.findOne(usuarioDTO.nif)
      //transforma el objeto DTO/IFaz ---> obj Entity
      const usuarioEntity = this.usuarioRepository.create(usuarioDTO);
      //Prepara FK, u.cliente = puntero (direccion de memoria del ob cliente)
      //no hace copia del obje cliente
      usuarioEntity.cliente = cliente; //direccion de memoria
      console.log(cliente, usuarioEntity)
      await this.usuarioRepository.save(usuarioEntity)
    } else { // obj cliente embebido en usuario --> caso 1 || caso 3 (cascade: true/false)
         const respuesta = await this.checkCascade();
          if (respuesta.cascade == true){
            console.log("ucliente en cascada")
            const usuarioEntity = this.usuarioRepository.create(usuarioDTO);
            //insert into Uusario (nif, nombre)...
            await this.usuarioRepository.save(usuarioEntity) //insert --> bd
          }else { //cascade == false. caso 3
            console.log ('casade: ', respuesta.cascade)
            //detructurar para extraer cliente y usuario
            //...usuario --> operador spread (es6)
            // Pas1 { ob1, ob2 } = objeto --> operador destructuracion del objeto
            const { cliente, ...usuario } = usuarioDTO;

           // console.log(cliente," - ", usuario);
            //usuarioDTO --> usuarioEntity
            
            //Paso2 - Inserta cliente
            this.clientesService.new(cliente);
           // const clienteE = this.clieneteREPO (cliente);
            //Paso3 - establecer la Fk en usuario con cliente
            const usuarioEntity = this.usuarioRepository.create(usuario)
            const clienteEntity = this.clientesService.create(cliente)
            usuarioEntity.cliente = clienteEntity; //FK
            //paso4-. Insertar el usuario
            this.usuarioRepository.save(usuarioEntity)

          // caca -->  this.clientesRepository.save(cliente);

          }
    }
    return {
        status: true,
        code: 200,
        msg: 'Usuario creado',
        // data: usuarioEntity
    }
    
  }

  async deleteAllUsarios(){
        console.log('borrar usuarios')
        const query = this.usuarioRepository.createQueryBuilder('usuario');
        try {
            return await query
                .delete()
                .where({})
                .execute()
        }catch(error){

        }
    }
  
    async checkCascade(){ //Entidad - relacion - tipo (i/d/u)
      //extrayendo en mtdata todo el esquema de la Entidad/Tabla Usuario
      const metadata = this.dataSource.getMetadata(Usuario);
      //console.log (metadata);
      const relacion = metadata.relations.find(
        (relacion) => relacion.propertyName == "cliente"
      );
      //console.log(relacion)
      const chcascade = relacion.isCascadeInsert || relacion.isCascadeUpdate;
      return {
        entidad: metadata.name,
        propiedad: relacion.propertyName,
        tipoRelacion: relacion.relationType,
        cascade: chcascade
      }
    }

}
