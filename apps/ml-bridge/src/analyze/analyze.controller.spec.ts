import { ActivityTracking, ActivityTrackingMeta } from '@fitly/shared/meta';
import { Test, TestingModule } from '@nestjs/testing';
import { DateTime, Interval } from 'luxon';
import { AnalyzeController } from './analyze.controller';
import { AnalyzeService } from './analyze.service';

describe('AnalyzeController', () => {
  let app: TestingModule;

  beforeAll(async () => {
    app = await Test.createTestingModule({
      controllers: [AnalyzeController],
      providers: [AnalyzeService],
    }).compile();
  });

  describe('analyzeData', () => {
    it('should return "Welcome to ml-bridge!"', () => {
      const controller = app.get<AnalyzeController>(AnalyzeController);
      const date1 = DateTime.fromISO('2020-09-06T12:00');
      const date2 = DateTime.fromISO('2019-06-10T14:00');
      const interval = Interval.fromDateTimes(date1, date2);
      const meta = new ActivityTrackingMeta(interval);

      const dto = new ActivityTracking(meta);
      expect(controller.analyzeData(dto)).toBeDefined();
    });
  });
});
