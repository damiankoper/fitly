import { ApiProperty } from '@nestjs/swagger';
import { SensorAsyncSample } from '@fitly/shared/meta';
import { AxesDataDTO } from './axes-data.dto';
import { DateTime } from 'luxon';

export class SensorAsyncSampleDTO extends SensorAsyncSample {
  @ApiProperty({
    type: DateTime,
    example: '2007-03-01T13:00:00Z',
    description: 'Timestamp measurements were taken (ISO)',
  })
  override timestamp!: DateTime;

  @ApiProperty({
    type: AxesDataDTO,
    description: 'Data',
  })
  override data!: AxesDataDTO;
}
