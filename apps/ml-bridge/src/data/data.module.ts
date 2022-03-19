import { Module } from '@nestjs/common';
import { FtpModule } from 'nestjs-ftp';
import { ConfigModule } from '../config/config.module';
import { ConfigService } from '../config/config.service';
import { DataController } from './data.controller';
import { DataService } from './data.service';

@Module({
  imports: [
    FtpModule.forRootFtpAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) =>
        configService.createFTPOptions(),
    }),
  ],
  controllers: [DataController],
  providers: [DataService],
})
export class DataModule {}
