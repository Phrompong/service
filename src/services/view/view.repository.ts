import { Injectable } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { ViewEntity } from 'src/models/entities/view.entity';
import { EntityManager, IsNull, Not } from 'typeorm';

@Injectable()
export class ViewRepository {
  constructor(@InjectEntityManager() private readonly db: EntityManager) {}

  async findAll(): Promise<ViewEntity> {
    return await this.db.getRepository(ViewEntity).findOne({
      select: { id: true, name: true, create_on: true, update_on: true },
      where: { id: Not(IsNull()) },
    });
  }

  async findById(id: number): Promise<ViewEntity> {
    return await this.db.getRepository(ViewEntity).findOne({
      select: {
        id: true,
        name: true,
        view: true,
        create_on: true,
        update_on: true,
      },
      where: { id: id },
    });
  }

  async addView(id: number): Promise<ViewEntity> {
    const view = await this.findById(id);

    if (!view) {
      throw new Error('View not found');
    }

    view.view += 1;
    view.update_on = new Date();
    await this.db.getRepository(ViewEntity).save(view);
    return view;
  }
}
