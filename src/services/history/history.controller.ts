import { Body, Controller, Get, Post } from '@nestjs/common';
import { HistoryService } from './history.service';
import { ApiTags } from '@nestjs/swagger';
import { HistoryDTO } from './history.dto';

@ApiTags('HistoryController')
@Controller('history')
export class HistoryController {
  constructor(private readonly historyService: HistoryService) {}

  @Get('')
  async getHistory() {
    return await this.historyService.findAll();
  }

  @Post('/save')
  async saveHistory(@Body() body: HistoryDTO) {
    return await this.historyService.save(body.value);
  }
}
