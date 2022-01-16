import { Controller, Get, Header } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  // constructor , dipendancy injection, instance of this controller
  constructor(private readonly appService: AppService) {}

  @Get()
  @Header('Content-Type', 'application/json')
  getHello(): { message: string } {
    return this.appService.getHello();
  }
}
