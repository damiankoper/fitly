import { ActivityTracking } from '@fitly/shared/meta';
import { Injectable } from '@nestjs/common';
import { instanceToPlain } from 'class-transformer';
import { FtpService } from 'nestjs-ftp';
import { Readable } from 'stream';

@Injectable()
export class DataService {
  constructor(private readonly ftpService: FtpService) {}

  async saveDataToFTP(data: ActivityTracking) {
    const json = JSON.stringify(instanceToPlain(data));
    const path = this.getFilePath(data);
    await this.ftpService.upload(Readable.from(json), path);
  }

  private getFilePath(data: ActivityTracking): string {
    const start = data.meta.interval.start.toMillis();
    const type = data.meta.type;
    return `/${type}/${start}.json`;
  }
}
