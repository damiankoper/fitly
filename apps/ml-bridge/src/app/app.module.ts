import { Module } from '@nestjs/common';
import { AnalyzeModule } from '../analyze/analyze.module';
import { DataModule } from '../data/data.module';

import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [DataModule, AnalyzeModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
