import { ActivityTracking, ActivityTrackingMeta } from '@fitly/shared/meta';
import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { instanceToPlain, plainToInstance } from 'class-transformer';
import { validateOrReject } from 'class-validator';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class AnalyzeService {
	constructor(private httpService: HttpService) {}

	async sendToML(data: ActivityTracking): Promise<ActivityTrackingMeta> {
		const plainData = instanceToPlain(data);
		const result = await firstValueFrom(
			this.httpService.post('', plainData)
		);
		const responseMeta = plainToInstance(ActivityTrackingMeta, result.data);
		await validateOrReject(responseMeta);

		return responseMeta;
	}
}
