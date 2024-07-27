import { Controller, Get, Param, Patch } from '@nestjs/common';
import { ViewEntity } from 'src/models/entities/view.entity';
import { ViewService } from './view.service';
import { ApiTags } from '@nestjs/swagger';
@ApiTags('ViewController')
@Controller('views')
export class ViewController {
  constructor(private readonly viewService: ViewService) {}

  @Get('')
  async getView(): Promise<ViewEntity> {
    return await this.viewService.findAll();
  }

  @Patch('/:name')
  async AddView(@Param('name') name: string): Promise<ViewEntity> {
    return await this.viewService.addView(name);
  }
}
