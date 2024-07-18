import { Controller, Get } from '@nestjs/common';

@Controller('views')
export class ViewController {
  constructor() {}

  @Get()
  getHello(): string {
    return 'Phrompong Khagtes';
  }
}
