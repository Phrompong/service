import { Controller, Get } from '@nestjs/common';

@Controller('views')
export class ViewsController {
  constructor() {}

  @Get()
  getHello(): string {
    return 'Phrompong Khagtes';
  }
}
