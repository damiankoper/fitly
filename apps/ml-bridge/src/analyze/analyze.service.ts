import { ActivityTracking, ActivityTrackingMeta } from '@fitly/shared/meta';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AnalyzeService {
  async sendToML(data: ActivityTracking): Promise<ActivityTrackingMeta> {
    const result = new ActivityTrackingMeta(data.meta.interval);
    return result;
  }
}
