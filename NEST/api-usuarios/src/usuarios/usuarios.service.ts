import { Injectable } from '@nestjs/common';
import { Low } from 'lowdb';
import { JSONFile } from 'lowdb/node';

@Injectable()
export class UsuariosService {
  private db: Low<any>;
  constructor(){
    const adaptador = new JSONFile('common/db/db.json');
    this.db = new Low(adaptador, { users: [] } );
  }

  async findAll(){
    await this.db.read();//se bloquea
    return this.db.data.users;
  }

  async new(usuario: any){
    await this.db.read();// cargo la base de datos
  //  const usuario = { id: 3, name: "Claudia", email: "claudia@gmail.com"  };
    this.db.data.users.push(usuario); //inserta en el array users
    this.db.write(); //escribe en el fichero
    console.log(this.db.data.users);
    return {
      msg: 'Usuario creado',
      data: this.db.data.users
    }
  }
}
