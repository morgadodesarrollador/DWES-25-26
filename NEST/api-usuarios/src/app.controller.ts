import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  //inyectar el servicio AppService en AppController
  constructor(private readonly appService: AppService) {}

  /*** USUARIOS  *****/
  @Get() /* endponit raiz */
  public getHome(): string {
    // return this.appService.getHello();
    return "API Usuarios funcionando";
  }

  


}
