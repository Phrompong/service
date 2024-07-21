import { HistoryEntity } from 'src/models/entities/history.entity';
import { HistoryRepository } from './history.repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class HistoryService {
  constructor(private readonly historyRepository: HistoryRepository) {}

  async findAll(): Promise<HistoryEntity[]> {
    return await this.historyRepository.findAll();
  }

  async save(value: string): Promise<HistoryEntity> {
    return await this.historyRepository.save(value);
  }
}
