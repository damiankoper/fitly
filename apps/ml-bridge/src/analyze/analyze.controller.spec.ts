import {
  ActivityTracking,
  ActivityTrackingMeta,
  ActivityType,
} from '@fitly/shared/meta';
import { Test, TestingModule } from '@nestjs/testing';
import { DateTime, Interval } from 'luxon';
import { AnalyzeController } from './analyze.controller';
import { AnalyzeService } from './analyze.service';
jest.mock('./analyze.service');

describe('AnalyzeController', () => {
  let app: TestingModule;
  const MockAnalyzeService =
    new (AnalyzeService as jest.Mock<AnalyzeService>)() as jest.Mocked<AnalyzeService>;

  beforeAll(async () => {
    app = await Test.createTestingModule({
      controllers: [AnalyzeController],
      providers: [{ provide: AnalyzeService, useValue: MockAnalyzeService }],
    }).compile();
  });

  it('should analyze and return 10 pushups', async () => {
    // given
    const controller = app.get<AnalyzeController>(AnalyzeController);
    const date1 = DateTime.fromISO('2020-09-06T12:00:00');
    const date2 = DateTime.fromISO('2020-09-10T14:00:00');
    const interval = Interval.fromDateTimes(date1, date2);
    const meta = new ActivityTrackingMeta(interval);
    const dto = new ActivityTracking(meta);

    const responseMeta = new ActivityTrackingMeta(
      interval,
      ActivityType.PUSHUPS,
      10
    );
    MockAnalyzeService.sendToML.mockResolvedValueOnce(responseMeta);

    // when
    const result = await controller.analyzeData(dto);

    // then
    expect(result).toBeInstanceOf(ActivityTrackingMeta);
    expect(result).toEqual(responseMeta);
  });
});
