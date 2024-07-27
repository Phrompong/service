import { Controller, Get } from '@nestjs/common';
import { HistoryService } from '../history/history.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('HealthCheckController')
@Controller('healthCheck')
export class HealthCheckController {
  constructor(private readonly historyService: HistoryService) {}

  @Get()
  async healthCheck(): Promise<{
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
