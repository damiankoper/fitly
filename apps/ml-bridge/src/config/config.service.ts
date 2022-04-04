import { Injectable } from '@nestjs/common';
import { IConnectionOptions } from 'nestjs-ftp';

@Injectable()
export class ConfigService {
  createFTPOptions(): IConnectionOptions {    
    return {
      host: process.env.FTP_HOST,
      user: process.env.FTP_USER,
      password: process.env.FTP_PASSWORD,
      port: +process.env.FTP_PORT
    };
  }
}
