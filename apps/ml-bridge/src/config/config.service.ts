import { HttpModuleOptions, HttpModuleOptionsFactory } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { IConnectionOptions } from 'nestjs-ftp';

@Injectable()
export class ConfigService implements HttpModuleOptionsFactory {
  createFTPOptions(): IConnectionOptions {
    return {
      host: process.env.FTP_HOST,
      user: process.env.FTP_USER,
      password: process.env.FTP_PASSWORD,
      port: +process.env.FTP_PORT,
    };
  }

  createHttpOptions(): HttpModuleOptions | Promise<HttpModuleOptions> {
    return {
      baseURL: process.env.ML_BASE_URL,
    };
  }
}
