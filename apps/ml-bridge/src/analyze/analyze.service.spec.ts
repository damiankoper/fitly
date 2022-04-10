import {
  ActivityTracking,
  ActivityTrackingMeta,
  ActivityType,
} from '@fitly/shared/meta';
import { HttpService } from '@nestjs/axios';
import { AxiosResponse } from 'axios';
import { Test, TestingModule } from '@nestjs/testing';
import { DateTime, Interval } from 'luxon';
import { of } from 'rxjs';
import { AnalyzeService } from './analyze.service';

describe('AnalyzeService', () => {
  let service: AnalyzeService;
  const MockHttpService: jest.Mocked<Partial<HttpService>> = {
    post: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AnalyzeService,
        { provide: HttpService, useValue: MockHttpService },
      ],
    }).compile();

    service = module.get<AnalyzeService>(AnalyzeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should send data to analyse and validate response', async () => {
    const activityTracking = new (jest.fn())() as ActivityTracking;
    const interval = Interval.after(DateTime.now(), 10000);
    const response = {
      data: {
        interval: interval.toISO(),
        repeats: 10,
        type: ActivityType.PUSHUPS,
      },
    } as AxiosResponse;
    MockHttpService.post.mockReturnValue(of(response));

    // when
    const result = await service.sendToML(activityTracking);

    // then
    expect(result).toBeInstanceOf(ActivityTrackingMeta);
    expect(result).toEqual({
      interval,
      repeats: 10,
      type: ActivityType.PUSHUPS,
    });
  });

  it('should send data to analyse and throw on invalid interval', async () => {
    const activityTracking = new (jest.fn())() as ActivityTracking;
    const response = {
      data: { interval: 'dupa', repeats: 'nonnumber', type: 123 },
    } as AxiosResponse;
    MockHttpService.post.mockReturnValue(of(response));

    // when
    const result = service.sendToML(activityTracking);

    // then
    await expect(result).rejects.toThrow(Error);
  });

  it('should send data to analyse and throw on invalid repeats and type', async () => {
    const activityTracking = new (jest.fn())() as ActivityTracking;
    const interval = Interval.after(DateTime.now(), 10000);
    const response = {
      data: { interval: interval.toISO(), repeats: 'nonnumber', type: 123 },
    } as AxiosResponse;
    MockHttpService.post.mockReturnValue(of(response));

    // when
    const result = service.sendToML(activityTracking);

    // then
    await expect(result).rejects.toBeInstanceOf(Array);
    await expect(result).rejects.toHaveLength(2);
  });
});
