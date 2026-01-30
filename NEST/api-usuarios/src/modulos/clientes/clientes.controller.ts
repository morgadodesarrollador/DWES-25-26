import { Body, Controller, Get, Post } from '@nestjs/common';
import { ClientesService } from './clientes.service';
import { CreateClienteDto } from './dto/cliente.dto';

@Controller('clientes')
export class ClientesController {
  //controlador --> servicio (inyectar servicio)
  constructor(private readonly clientesService: ClientesService) {}

  @Post()
  add (@Body() clienteDTO: CreateClienteDto) {
    this.clientesService.new(clienteDTO)
  }

  @Get(':nif')
    findOne(nif: string){
      return this.clientesService.findOne(nif);
  
    }
}
