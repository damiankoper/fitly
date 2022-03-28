import { ActivityTrackingDTO } from '@fitly/ml-bridge/dto';
import { ActivityTrackingMeta } from '@fitly/shared/meta';
import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AnalyzeService } from './analyze.service';

@ApiTags('Analyze')
@Controller('analyze')
export class AnalyzeController {
    constructor(private readonly analyzeService: AnalyzeService) {}

    @Post()
    async analyzeData(@Body() body: ActivityTrackingDTO) : Promise<ActivityTrackingMeta> {
      return await this.analyzeService.sendToML(body);
    }
}
