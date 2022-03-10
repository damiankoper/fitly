import { Module } from '@nestjs/common';
import { DataModule } from '../data/data.module';

import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [DataModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
