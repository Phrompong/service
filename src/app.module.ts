import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ViewsModule } from './services/view/view.module';
import { ViewController } from './services/view/view.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { resolve } from 'path';
import { ViewService } from './services/view/view.service';
import { ViewRepository } from './services/view/view.repository';
import { ViewEntity } from './models/entities/view.entity';
import { HistoryModule } from './services/history/history.module';
import { HistoryController } from './services/history/history.controller';
import { HistoryEntity } from './models/entities/history.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5433,
      username: 'admin',
      password: 'password',
      database: 'jaew_db',
      entities: [ViewEntity, HistoryEntity],
      synchronize: true,
    }), // * COnfig database
    ViewsModule,
    HistoryModule,
  ],
  controllers: [],
})
export class AppModule {}
