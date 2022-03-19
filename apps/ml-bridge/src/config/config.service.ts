import { Injectable } from '@nestjs/common';
import { IConnectionOptions } from 'nestjs-ftp';

@Injectable()
export class ConfigService {
    createFTPOptions(): IConnectionOptions {
        return {
            host: 'ftp.dlptest.com',
            user: 'dlpuser',
            password: 'rNrKYTX9g7z3RgJRmxWuGHbeu',
            port: 21,
        };
    }
}
