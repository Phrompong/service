import { Controller, Get } from '@nestjs/common';
import { ViewEntity } from 'src/models/entities/view.entity';
import { ViewService } from './view.service';

@Controller('views')
export class ViewController {
  constructor(private readonly viewService: ViewService) {}

  @Get('view')
  async getView(): Promise<ViewEntity> {
    const data = await this.viewService.findAll();
    return await this.viewService.findAll();
  }
}
