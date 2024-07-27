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
import { ConfigModule } from '@nestjs/config';
import { HealthCheckModule } from './services/healthCheck/healthCheck.module';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: '.production.env' }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DATABASE_HOST,
      port: +process.env.DATABASE_PORT,
      username: process.env.DATABASE_USERNAME,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      entities: [ViewEntity, HistoryEntity],
      synchronize: true,
    }), // * COnfig database
    ViewsModule,
    HistoryModule,
    HealthCheckModule,
  ],
  controllers: [],
})
export class AppModule {}
