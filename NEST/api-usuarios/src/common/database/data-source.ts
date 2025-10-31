import { DataSource } from 'typeorm';
import { Cliente } from '../../modulos/clientes/entities/cliente.entity';

export default new DataSource({
  type: 'postgres',
  host: '212.90.120.146',
  port: 5432,
  username: 'admin',
  password: 'admin',
  database:  'bdusuarios',
  entities: [Cliente],
  migrations: ['dist/database/migrations/*.js'],
  synchronize: false, // 👈 Muy importante
  logging: true,
});