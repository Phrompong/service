import { ViewEntity } from 'src/models/entities/view.entity';
import { ViewRepository } from './view.repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ViewService {
  constructor(private readonly viewRepository: ViewRepository) {}

  async findAll(): Promise<ViewEntity> {
    return await this.viewRepository.findAll();
  }

  async addView(name: string): Promise<ViewEntity> {
    return await this.viewRepository.addView(name);
  }
}
