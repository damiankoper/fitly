import {
  ActivityTracking,
  ActivityTrackingMeta,
  ActivityType,
} from '@fitly/shared/meta';
import { Test } from '@nestjs/testing';
import { DateTime, Interval } from 'luxon';
import { FtpService } from 'nestjs-ftp';
import { Readable } from 'stream';
import { DataService } from './data.service';

describe('DataService', () => {
  let service: DataService;

  const MockFtpService = {
    upload: jest.fn(),
  };

  beforeAll(async () => {
    const app = await Test.createTestingModule({
      imports: [],
      providers: [
        DataService,
        { provide: FtpService, useValue: MockFtpService },
      ],
    }).compile();

    service = app.get<DataService>(DataService);
  });

  it('should compute file path and send activity to ftp', async () => {
    // given
    const start = DateTime.now();
    const stop = start.plus({ hour: 1 });
    const interval = Interval.fromDateTimes(start, stop);
    const type = ActivityType.STAR_JUMPS;
    const meta = new ActivityTrackingMeta(interval, type, 10);
    const tracking = new ActivityTracking(meta);

    // when
    const result = await service.saveDataToFTP(tracking);

    // then
    expect(result).toBeUndefined();

    const filePath = `/${type}/${start.toMillis()}.json`;
    expect(MockFtpService.upload).toBeCalledWith(
      expect.any(Readable),
      filePath
    );
  });
});
