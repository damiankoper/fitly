import { ActivityTracking, ActivityTrackingMeta } from '@fitly/shared/meta';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AnalyzeService {
    async sendToML(data: ActivityTracking): Promise<ActivityTrackingMeta> {
        let result = new ActivityTrackingMeta()
        return result
    }
}
