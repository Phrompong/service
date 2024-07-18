import { Module } from '@nestjs/common';
import { ViewController } from './view.controller';
import { ViewService } from './view.service';
import { ViewRepository } from './view.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ViewEntity } from 'src/models/entities/view.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ViewEntity])],
  controllers: [ViewController],
  providers: [ViewService, ViewRepository],
})
export class ViewsModule {}
