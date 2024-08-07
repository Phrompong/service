import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { HistoryService } from './services/history/history.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('AppController')
@Controller('app')
export class AppController {
  constructor(private readonly historyService: HistoryService) {}

  @Get('/healthCheck')
  async getHello(): Promise<{
    databaseConnected: boolean;
    status: boolean;
  }> {
    const values = await this.historyService.findAll();

    return {
      databaseConnected: values.length >= 0 ? true : false,
      status: true,
    };
  }
}
