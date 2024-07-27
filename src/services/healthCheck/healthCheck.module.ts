import { Module } from '@nestjs/common';
import { HistoryService } from '../history/history.service';
import { HealthCheckController } from './healthCheck.controller';
import { HistoryRepository } from '../history/history.repository';

@Module({
  imports: [],
  controllers: [HealthCheckController],
  providers: [HistoryService, HistoryRepository],
})
export class HealthCheckModule {}
