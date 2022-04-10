import { Test } from '@nestjs/testing';
import { FtpModule, FtpService } from 'nestjs-ftp';
import { ConfigService } from '../config/config.service';
import { DataService } from './data.service';
import { ConfigModule } from '../config/config.module';

describe('DataService', () => {
  let service: DataService;

  beforeAll(async () => {
    const app = await Test.createTestingModule({
      imports: [
        FtpModule.forRootFtpAsync({
          imports: [ConfigModule],
          inject: [ConfigService],
          useFactory: async (configService: ConfigService) =>
            configService.createFTPOptions(),
        }),
      ],
      providers: [DataService, FtpService],
    }).compile();

    service = app.get<DataService>(DataService);
  });

  describe('getData', () => {
    it('should return "siemanko witam w moim serwisie!"', () => {
      expect(service.getData()).toEqual({
        message: 'siemanko witam w moim serwisie!',
      });
    });
  });
});
