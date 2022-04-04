import { Injectable } from '@nestjs/common';
import { IConnectionOptions } from 'nestjs-ftp';
import { ConfigModule } from '@nestjs/config';

@Injectable()
export class ConfigService {
  createFTPOptions(): IConnectionOptions {    
    return {
      host: process.env.FTP_HOST || 'ftp.dlptest.com',
      user: process.env.FTP_USER || 'dlpuser',
      password: process.env.FTP_PASSWORD || 'rNrKYTX9g7z3RgJRmxWuGHbeu',
      port: +process.env.FTP_PORT || 21,
    };
  }
}
