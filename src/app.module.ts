import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ViewsModule } from './services/views/views.module';
import { ViewsController } from './services/views/views.controller';

@Module({
  imports: [ViewsModule],
  controllers: [AppController, ViewsController],
  providers: [AppService],
})
export class AppModule {}
