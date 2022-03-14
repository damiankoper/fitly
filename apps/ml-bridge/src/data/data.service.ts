import { PostDataRequest } from '@fitly/shared/meta';
import { Injectable } from '@nestjs/common';
import { FtpService } from 'nestjs-ftp';
import { Readable } from 'stream';

@Injectable()
export class DataService {
  constructor(private readonly ftpService: FtpService) {}

  getData(): { message: string } {
    return { message: 'siemanko witam w moim serwisie!' };
  }

  async saveDataToFTP(data: PostDataRequest) {
    try {
      await this.ftpService.upload(
        Readable.from(data.message),
        'fitly_file.txt'
      );
    } catch (error) {
      throw new Error(error);
    }
  }
}
