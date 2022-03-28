import { ActivityTrackingDTO } from '@fitly/ml-bridge/dto';
import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { DataService } from './data.service';

@ApiTags('Data')
@Controller('data')
export class DataController {
  constructor(private readonly dataService: DataService) {}

  @Get()
  getData() {
    return this.dataService.getData();
  }

  @Post()
  async postData(@Body() body: ActivityTrackingDTO) {
    return await this.dataService.saveDataToFTP(body);
  }
}
