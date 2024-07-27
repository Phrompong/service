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

  async findName(name: string): Promise<ViewEntity> {
    return await this.db.getRepository(ViewEntity).findOne({
      select: {
        id: true,
        name: true,
        view: true,
        create_on: true,
        update_on: true,
      },
      where: { name: name },
    });
  }

  async addView(name: string): Promise<ViewEntity> {
    const view = await this.findName(name);

    if (!view) {
      return await this.db.getRepository(ViewEntity).save({
        name: name,
        view: 1,
        create_on: new Date(),
        update_on: new Date(),
      });
    }

    view.view += 1;
    view.update_on = new Date();
    return await this.db.getRepository(ViewEntity).save(view);
  }
}
