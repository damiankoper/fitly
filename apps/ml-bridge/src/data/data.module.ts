import { Module } from '@nestjs/common';
import { FtpModule } from 'nestjs-ftp';
import { DataController } from './data.controller';
import { DataService } from './data.service';

@Module({
  imports: [
    FtpModule.forRootFtpAsync({
      useFactory: async () => {
        return {
          host: 'ftp.dlptest.com',
          user: 'dlpuser',
          password: 'rNrKYTX9g7z3RgJRmxWuGHbeu',
          port: 21,
        };
      },
    }),
  ],
  controllers: [DataController],
  providers: [DataService],
})
export class DataModule {}
