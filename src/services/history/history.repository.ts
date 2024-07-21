import { InjectEntityManager } from '@nestjs/typeorm';
import { HistoryEntity } from 'src/models/entities/history.entity';
import { EntityManager, IsNull, Not } from 'typeorm';

export class HistoryRepository {
  constructor(@InjectEntityManager() private readonly db: EntityManager) {}

  async findAll(): Promise<HistoryEntity[]> {
    return await this.db.getRepository(HistoryEntity).find({
      select: { id: true, value: true, create_on: true, update_on: true },
      where: { id: Not(IsNull()) },
    });
  }

  async save(value: string): Promise<HistoryEntity> {
    const history = this.db.getRepository(HistoryEntity).create({
      value,
      create_on: new Date(),
      update_on: new Date(),
    });
    await this.db.getRepository(HistoryEntity).save(history);
    return history;
  }
}
