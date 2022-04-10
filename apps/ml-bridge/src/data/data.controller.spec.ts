import { Test, TestingModule } from '@nestjs/testing';
import { FtpService } from 'nestjs-ftp';
import { DataController } from './data.controller';
import { DataService } from './data.service';

describe('DataController', () => {
  let controller: DataController;

  const MockFtpService = {};

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DataController],
      providers: [
        DataService,
        { provide: FtpService, useValue: MockFtpService },
      ],
    }).compile();

    controller = module.get<DataController>(DataController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
