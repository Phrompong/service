import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ViewsModule } from './services/view/view.module';
import { ViewController } from './services/view/view.controller';

@Module({
  imports: [ViewsModule],
  controllers: [AppController, ViewController],
  providers: [AppService],
})
export class AppModule {}
