import { ActivityTrackingDTO } from '@fitly/shared/meta';
import { Injectable } from '@nestjs/common';
import { instanceToPlain } from 'class-transformer';
import { FtpService } from 'nestjs-ftp';
import { Readable } from 'stream';

@Injectable()
export class DataService {
  constructor(private readonly ftpService: FtpService) {}

  getData(): { message: string } {
    return { message: 'siemanko witam w moim serwisie!' };
  }

  async saveDataToFTP(data: ActivityTrackingDTO) {
    try {
      const json = JSON.stringify(instanceToPlain(data));

      await this.ftpService.upload(Readable.from(json), 'fitly_file.json');
    } catch (error) {
      throw new Error(error);
    }
  }
}
